import {UnitNameRefData, UnitType} from '../../../../../api-def/api';
import {CharaInfo, CharaInfoData, DragonInfo, UnitInfoData, UnitInfoDataBase} from '../../../../../api-def/resources';
import {transformForSearch} from '../../../../../utils/text';
import {UnitFilterInputData} from './types';


export const generateFilterInput = <S extends string>(sortBy: S): UnitFilterInputData<S> => ({
  keyword: '',
  type: UnitType.CHARACTER,
  elements: [],
  weaponTypes: [],
  sortBy,
});

export const getFilteredUnitInfo = <S extends string>(
  inputData: UnitFilterInputData<S> | undefined,
  charaInfo: CharaInfo,
  dragonInfo: DragonInfo,
  unitNameRef: UnitNameRefData,
): Array<UnitInfoData> => {
  if (!inputData) {
    return [];
  }

  const ret: Array<UnitInfoData> = [];

  const isUnitElementMatch = (unit: UnitInfoDataBase) => (
    !inputData.elements.length || inputData.elements.includes(unit.element)
  );

  const isUnitWeaponMatch = (unit: CharaInfoData) => (
    !inputData.weaponTypes.length || inputData.weaponTypes.includes(unit.weapon)
  );

  const isUnitNameMatch = (unit: UnitInfoDataBase) => {
    if (!inputData.keyword) {
      return true;
    }

    const keywordProcessed = transformForSearch(inputData.keyword);

    const isKeywordPartialUnitName = Object
      .values(unit.name)
      .some((name) => (
        transformForSearch(name, {variantInsensitive: false}).indexOf(keywordProcessed) >= 0
      ));
    const isKeywordPartialCustomName = Object.entries(unitNameRef)
      .filter(([_, referencedUnitId]) => unit.id === referencedUnitId)
      .some(([name, _]) => (
        transformForSearch(name, {variantInsensitive: false}).indexOf(keywordProcessed) >= 0
      ));

    return isKeywordPartialUnitName || isKeywordPartialCustomName;
  };

  const isInfoChara = (info: any): info is CharaInfoData => {
    return info.type === UnitType.CHARACTER;
  };

  if (inputData.type === UnitType.CHARACTER) {
    ret.push(
      ...charaInfo
        .filter((chara) => (
          isUnitElementMatch(chara) && isUnitWeaponMatch(chara) && isUnitNameMatch(chara)
        ))
        .map((info) => ({...info, type: UnitType.CHARACTER})),
    );
  } else if (inputData.type === UnitType.DRAGON) {
    ret.push(
      ...dragonInfo
        .filter((chara) => isUnitElementMatch(chara) && isUnitNameMatch(chara))
        .map((info) => ({...info, type: UnitType.DRAGON})),
    );
  }

  return ret.sort((a, b) => (
    a.type - b.type || // Type ASC (CHARA -> DRAGON)
    b.rarity - a.rarity || // Rarity DESC (5 -> 3)
    a.element - b.element || // Elem ASC (FLAME -> SHADOW)
    (isInfoChara(a) && isInfoChara(b) ? a.weapon - b.weapon : 0) // Weapon ASC if chara (SWORD -> MANACASTER)
  ));
};

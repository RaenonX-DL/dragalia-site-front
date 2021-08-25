import {UnitType} from '../../../../../api-def/api';
import {CharaInfo, CharaInfoData, DragonInfo, UnitInfoData, UnitInfoDataBase} from '../../../../../api-def/resources';
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
    const keywordLower = inputData.keyword.toLowerCase();

    return Object
      .values(unit.name)
      .some((name) => name.toLowerCase().indexOf(keywordLower) >= 0);
  };

  if (inputData.type === UnitType.CHARACTER) {
    ret.push(
      ...charaInfo
        .filter((chara) => (
          isUnitElementMatch(chara) && isUnitWeaponMatch(chara) && isUnitNameMatch(chara)
        ))
        .map((info) => ({...info, type: UnitType.CHARACTER, analysisMeta: null})),
    );
  } else if (inputData.type === UnitType.DRAGON) {
    ret.push(
      ...dragonInfo
        .filter((chara) => isUnitElementMatch(chara) && isUnitNameMatch(chara))
        .map((info) => ({...info, type: UnitType.DRAGON, analysisMeta: null})),
    );
  }

  const isInfoChara = (info: any): info is CharaInfoData => {
    return info.type === UnitType.CHARACTER;
  };

  return ret.sort((a, b) => (
    a.type - b.type || // Type ASC (CHARA -> DRAGON)
    b.rarity - a.rarity || // Rarity DESC (5 -> 3)
    a.element - b.element || // Elem ASC (FLAME -> SHADOW)
    (isInfoChara(a) && isInfoChara(b) ? a.weapon - b.weapon : 0) // Weapon ASC if chara (SWORD -> MANACASTER)
  ));
};

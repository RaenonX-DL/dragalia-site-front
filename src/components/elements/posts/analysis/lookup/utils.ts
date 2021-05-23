import {UnitType} from '../../../../../api-def/api';
import {DepotPaths} from '../../../../../utils/services/resources';
import {CharaInfo, CharaInfoData, DragonInfo, UnitInfoDataBase} from '../../../../../utils/services/resources/types';
import {InputData} from './in/types';
import {UnitInfo} from './types';

export const getUnitInfo = (
  inputData: InputData,
  charaInfo: CharaInfo,
  dragonInfo: DragonInfo,
): Array<UnitInfo> => {
  const ret: Array<UnitInfo> = [];

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

  // Add characters
  if (!inputData.types.length || inputData.types.includes(UnitType.CHARACTER)) {
    ret.push(
      ...charaInfo
        .filter((chara) => (
          isUnitElementMatch(chara) && isUnitWeaponMatch(chara) && isUnitNameMatch(chara)
        ))
        .map((info) => ({...info, unitType: UnitType.CHARACTER, analysisMeta: null})),
    );
  }
  // Add dragons
  if (
    // Specified to get the dragon analysis
    inputData.types.includes(UnitType.DRAGON) ||
    // No type and weapon type specified
    // (if specified weapon type, then dragon analyses should be disregarded)
    (!inputData.types.length && !inputData.weaponTypes.length)
  ) {
    ret.push(
      ...dragonInfo
        .filter((chara) => isUnitElementMatch(chara) && isUnitNameMatch(chara))
        .map((info) => ({...info, unitType: UnitType.DRAGON, analysisMeta: null})),
    );
  }

  return ret;
};

const fnGetImageURL: { [unitType in UnitType]: (iconName: string) => string } = {
  [UnitType.CHARACTER]: DepotPaths.getCharaIconURL,
  [UnitType.DRAGON]: DepotPaths.getDragonIconURL,
};

export const getImageURL = (unitInfo: UnitInfo) => {
  return fnGetImageURL[unitInfo.unitType](unitInfo.iconName);
};

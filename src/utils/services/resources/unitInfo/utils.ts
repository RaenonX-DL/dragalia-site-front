import {SupportedLanguages, UnitType} from '../../../../api-def/api';
import {DepotPaths} from '../../../../api-def/resources/paths';
import {UnitInfoData} from '../../../../api-def/resources/types/unitInfo';
import {ResourceLoader} from '../loader';
import {UnitNameInfoMap} from './types';


let cache: UnitNameInfoMap;

export const getUnitNameInfoMap = async (lang: SupportedLanguages): Promise<UnitNameInfoMap> => {
  if (typeof window === 'undefined') {
    // This method may be used multiple times.
    // Limit this to client side only reduces response desync issue.
    throw new Error('This is only allowed to run at the client side');
  }

  if (cache) {
    return cache;
  }

  const unitInfo = await Promise.all([ResourceLoader.getCharacterInfo(), ResourceLoader.getDragonInfo()]);

  cache = new Map(unitInfo
    .flat()
    .map((unitInfo) => [unitInfo.name[lang], unitInfo]),
  );
  return cache;
};

const fnGetImageURL: { [unitType in UnitType]: (iconName: string) => string } = {
  [UnitType.CHARACTER]: DepotPaths.getCharaIconURL,
  [UnitType.DRAGON]: DepotPaths.getDragonIconURL,
};

export const getImageURL = (unitInfo: UnitInfoData) => {
  return fnGetImageURL[unitInfo.type](unitInfo.iconName);
};

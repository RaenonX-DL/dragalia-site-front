import {SupportedLanguages, UnitType} from '../../../../api-def/api';
import {DepotPaths} from '../../../../api-def/resources/paths';
import {UnitInfoData, UnitInfoMap} from '../../../../api-def/resources/types/unitInfo';
import {toUnitInfoMap} from '../../../../api-def/resources/utils/unitInfo';
import {ResourceLoader} from '../loader';


const cache: {[lang in SupportedLanguages]?: UnitInfoMap<string>} = {};

export const getUnitNameInfoMap = async (lang: SupportedLanguages): Promise<UnitInfoMap<string>> => {
  if (typeof window === 'undefined') {
    // This method may be used multiple times.
    // Limit this to client side only reduces response desync issue.
    throw new Error('This is only allowed to run at the client side');
  }

  let nameInfoMap = cache[lang];
  if (nameInfoMap) {
    return nameInfoMap;
  }

  const unitInfo = await Promise.all([ResourceLoader.getCharacterInfo(), ResourceLoader.getDragonInfo()]);

  nameInfoMap = cache[lang] = toUnitInfoMap(unitInfo[0], unitInfo[1], (info) => info.name[lang]);
  return nameInfoMap;
};

const fnGetImageURL: { [unitType in UnitType]: (iconName: string) => string } = {
  [UnitType.CHARACTER]: DepotPaths.getCharaIconURL,
  [UnitType.DRAGON]: DepotPaths.getDragonIconURL,
};

export const getImageURL = (unitInfo: UnitInfoData) => {
  return fnGetImageURL[unitInfo.type](unitInfo.iconName);
};

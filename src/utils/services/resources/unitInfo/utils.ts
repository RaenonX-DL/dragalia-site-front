import {SupportedLanguages, UnitType} from '../../../../api-def/api';
import {DepotPaths, toUnitInfoMap, toUnitInfoNameMap, UnitInfoData, UnitInfoMap} from '../../../../api-def/resources';
import {UnitInfoRequireIcon} from '../../../../components/elements/gameData/unit/modal/types';
import {ApiRequestSender} from '../../api/requestSender';
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

  const [charaInfo, dragonInfo, unitNameRef] = await Promise.all([
    ResourceLoader.getCharacterInfo(),
    ResourceLoader.getDragonInfo(),
    ApiRequestSender.getUnitNameReferences(lang),
  ]);
  const unitInfoIdMap = toUnitInfoMap(charaInfo, dragonInfo, (info) => info.id);
  const unitInfoMap = toUnitInfoNameMap(unitInfoIdMap, lang, unitNameRef.data);

  nameInfoMap = cache[lang] = unitInfoMap;

  return nameInfoMap;
};

const fnGetImageURL: {[unitType in UnitType]: (iconName: string) => string} = {
  [UnitType.CHARACTER]: DepotPaths.getCharaIconURL,
  [UnitType.DRAGON]: DepotPaths.getDragonIconURL,
};

export const getImageURL = (unitInfo: UnitInfoData) => {
  return fnGetImageURL[unitInfo.type](unitInfo.iconName);
};

export const unitInfoToClickableProps = (unitInfo: UnitInfoData, lang: SupportedLanguages): UnitInfoRequireIcon => ({
  id: unitInfo.id,
  name: unitInfo.name[lang],
  icon: {
    type: unitInfo.type,
    name: unitInfo.iconName,
  },
});

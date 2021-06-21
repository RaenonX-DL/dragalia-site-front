import {SupportedLanguages} from '../../../../api-def/api';
import {ResourceLoader} from '../loader';


export const getUnitNameIdMap = async (lang: SupportedLanguages): Promise<Record<string, number>> => {
  const ret: Record<string, number> = {};

  const unitInfo = await Promise.all([ResourceLoader.getCharacterInfo(), ResourceLoader.getDragonInfo()]);

  unitInfo
    .flat()
    .forEach((unitInfo) => {
      ret[unitInfo.name[lang]] = unitInfo.id;
    });
  return ret;
};

import {SupportedLanguages} from '../../../../api-def/api';
import {ResourceLoader} from '../loader';


type UnitNameIdMap = Map<string, number>;

let cache: UnitNameIdMap;

export const getUnitNameIdMap = async (lang: SupportedLanguages): Promise<UnitNameIdMap> => {
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
    .map((unitInfo) => [unitInfo.name[lang], unitInfo.id]),
  );
  return cache;
};

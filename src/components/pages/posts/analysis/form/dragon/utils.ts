import {DragonAnalysisPublishPayload, SupportedLanguages, UnitType} from '../../../../../../api-def/api';


export const generatePayload = (lang: SupportedLanguages, uid?: string): DragonAnalysisPublishPayload => {
  return {
    uid: uid || '',
    lang,
    type: UnitType.DRAGON,
    unitId: 0,
    summary: '',
    summonResult: '',
    passives: '',
    normalAttacks: '',
    ultimate: '',
    notes: '',
    suitableCharacters: '',
    videos: '',
    story: '',
    keywords: '',
  };
};

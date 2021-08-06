import {CharaAnalysisPublishPayload, SupportedLanguages, UnitType} from '../../../../../../api-def/api';
import {generateNewCharaSkill} from '../../../../../../utils/services/api/utils';


export const generatePayload = (lang: SupportedLanguages, uid?: string): CharaAnalysisPublishPayload => {
  return {
    uid: uid || '',
    unitId: 0,
    lang,
    type: UnitType.CHARACTER,
    summary: '',
    summonResult: '',
    passives: '',
    normalAttacks: '',
    forceStrikes: '',
    skills: [
      generateNewCharaSkill('S1'),
      generateNewCharaSkill('S2'),
    ],
    tipsBuilds: '',
    videos: '',
    story: '',
    keywords: '',
  };
};

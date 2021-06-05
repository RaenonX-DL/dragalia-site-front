import React from 'react';

import {UnitType} from '../../../src/api-def/api';
import {AnalysisFormCharaNew} from '../../../src/components/elements/posts/analysis/form/charaNew';
import {useI18n} from '../../../src/i18n/hook';
import {CookiesControl} from '../../../src/utils/cookies';
import {ApiRequestSender} from '../../../src/utils/services/api/requestSender';
import {generateNewCharaSkill} from '../../../src/utils/services/api/utils';


const AnalysisNewChara = () => {
  const {lang} = useI18n();

  return (
    <AnalysisFormCharaNew
      initialPayload={{
        googleUid: CookiesControl.getGoogleUid() || '',
        lang: lang,
        type: UnitType.CHARACTER,
        unitId: 0,
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
      }}
      fnSendRequest={ApiRequestSender.analysisPublishChara}
    />
  );
};

export default AnalysisNewChara;

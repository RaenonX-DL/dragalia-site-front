import React from 'react';

import {UnitType} from '../../../src/api-def/api';
import {AnalysisFormCharaNew} from '../../../src/components/elements/posts/analysis/form/charaNew';
import {useI18n} from '../../../src/i18n/hook';
import {CookiesKeys} from '../../../src/utils/cookies/keys';
import {getCookies} from '../../../src/utils/cookies/utils';
import {ApiRequestSender} from '../../../src/utils/services/api/requestSender';
import {generateNewCharaSkill} from '../../../src/utils/services/api/utils';


// FIXME: If not admin, redirect

const AnalysisNewChara = () => {
  const {lang} = useI18n();

  return (
    <AnalysisFormCharaNew
      initialPayload={{
        googleUid: getCookies(CookiesKeys.GOOGLE_UID) || '',
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

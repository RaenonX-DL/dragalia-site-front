import React from 'react';

import {useSession} from 'next-auth/client';

import {UnitType} from '../../../../src/api-def/api';
import {AnalysisFormCharaNew} from '../../../../src/components/elements/posts/analysis/form/charaNew';
import {useI18n} from '../../../../src/i18n/hook';
import {ApiRequestSender} from '../../../../src/utils/services/api/requestSender';
import {generateNewCharaSkill} from '../../../../src/utils/services/api/utils';


// FIXME: [Blocked by Auth Rework] If not admin, redirect

const AnalysisNewChara = () => {
  const {lang} = useI18n();
  const [session] = useSession();

  return (
    <AnalysisFormCharaNew
      initialPayload={{
        uid: session?.user.id.toString() || '',
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

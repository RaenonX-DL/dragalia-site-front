import React from 'react';

import {UnitType} from '../../../../src/api-def/api';
import {AnalysisFormDragonNew} from '../../../../src/components/elements/posts/analysis/form/dragonNew';
import {useI18n} from '../../../../src/i18n/hook';
import {CookiesControl} from '../../../../src/utils/cookies';
import {ApiRequestSender} from '../../../../src/utils/services/api/requestSender';


const AnalysisNewDragon = () => {
  const {lang} = useI18n();

  return (
    <AnalysisFormDragonNew
      initialPayload={{
        googleUid: CookiesControl.getGoogleUid() || '',
        lang: lang,
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
      }}
      fnSendRequest={ApiRequestSender.analysisPublishDragon}
    />
  );
};

export default AnalysisNewDragon;

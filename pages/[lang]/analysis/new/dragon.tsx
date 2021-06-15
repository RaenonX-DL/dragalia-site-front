import React from 'react';

import {UnitType} from '../../../../src/api-def/api';
import {AnalysisFormDragonNew} from '../../../../src/components/elements/posts/analysis/form/dragonNew';
import {AppReactContext} from '../../../../src/context/app/main';
import {useI18n} from '../../../../src/i18n/hook';
import {ApiRequestSender} from '../../../../src/utils/services/api/requestSender';


// FIXME: [Blocked by Auth Rework] If not admin, redirect

const AnalysisNewDragon = () => {
  const {lang} = useI18n();
  const context = React.useContext(AppReactContext);

  return (
    <AnalysisFormDragonNew
      initialPayload={{
        uid: context?.session?.user.id.toString() || '',
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

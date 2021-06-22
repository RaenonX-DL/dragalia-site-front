import React from 'react';

import {CharaAnalysisPublishPayload, UnitType} from '../../../../../../api-def/api';
import {AppReactContext} from '../../../../../../context/app/main';
import {useI18n} from '../../../../../../i18n/hook';
import {ApiRequestSender} from '../../../../../../utils/services/api/requestSender';
import {generateNewCharaSkill} from '../../../../../../utils/services/api/utils';
import {PostFormState} from '../../../shared/form/types';
import {AnalysisFormChara} from './main';


export const AnalysisFormCharaNew = () => {
  const {lang} = useI18n();
  const context = React.useContext(AppReactContext);
  const [formState, setFormState] = React.useState<PostFormState<CharaAnalysisPublishPayload>>({
    payload: {
      uid: context?.session?.user.id.toString() || '',
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
    },
    isIdAvailable: false,
    isPreloaded: false,
  });

  return (
    <AnalysisFormChara
      formState={formState}
      setFormState={setFormState}
      fnSendRequest={ApiRequestSender.analysisPublishChara}
    />
  );
};

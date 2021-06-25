import React from 'react';

import {DragonAnalysisPublishPayload, UnitType} from '../../../../../../api-def/api';
import {AppReactContext} from '../../../../../../context/app/main';
import {useI18n} from '../../../../../../i18n/hook';
import {ApiRequestSender} from '../../../../../../utils/services/api/requestSender';
import {PostFormState} from '../../../shared/form/types';
import {AnalysisFormDragon} from './main';


export const AnalysisFormDragonNew = () => {
  const {lang} = useI18n();
  const context = React.useContext(AppReactContext);
  const [formState, setFormState] = React.useState<PostFormState<DragonAnalysisPublishPayload>>({
    payload: {
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
    },
    isIdAvailable: false,
    isPreloaded: false,
  });

  return (
    <AnalysisFormDragon
      formState={formState}
      setFormState={setFormState}
      fnSendRequest={ApiRequestSender.analysisPublishDragon}
    />
  );
};

import React from 'react';

import {DragonAnalysisPublishPayload} from '../../../../../../api-def/api';
import {AppReactContext} from '../../../../../../context/app/main';
import {useI18n} from '../../../../../../i18n/hook';
import {backupDispatchers} from '../../../../../../state/backup/dispatchers';
import {useBackupSelector} from '../../../../../../state/backup/selector';
import {useDispatch} from '../../../../../../state/store';
import {overrideObject} from '../../../../../../utils/override';
import {ApiRequestSender} from '../../../../../../utils/services/api/requestSender';
import {PostFormState} from '../../../shared/form/types';
import {AnalysisFormDragon} from './main';
import {generatePayload} from './utils';


export const AnalysisFormDragonNew = () => {
  const {lang} = useI18n();
  const context = React.useContext(AppReactContext);

  const {analysis} = useBackupSelector();
  const dispatch = useDispatch();

  const [formState, setFormState] = React.useState<PostFormState<DragonAnalysisPublishPayload>>({
    payload: overrideObject(generatePayload(lang, context?.session?.user.id.toString()), analysis.dragon),
    isIdAvailable: false,
    isPreloaded: false,
  });

  return (
    <AnalysisFormDragon
      formState={formState}
      setFormState={(newState) => {
        dispatch(backupDispatchers.backupDragonAnalysis(newState.payload));
        setFormState(newState);
      }}
      fnSendRequest={ApiRequestSender.analysisPublishDragon}
      onSubmitSuccess={() => dispatch(backupDispatchers.clearDragonAnalysis())}
    />
  );
};

import React from 'react';

import {useSession} from 'next-auth/react';

import {DragonAnalysisPublishPayload} from '../../../../../../api-def/api';
import {useI18n} from '../../../../../../i18n/hook';
import {backupDispatchers} from '../../../../../../state/backup/dispatchers';
import {useBackupSelector} from '../../../../../../state/backup/selector';
import {useDispatch} from '../../../../../../state/store';
import {overrideObject} from '../../../../../../utils/override';
import {ApiRequestSender} from '../../../../../../utils/services/api/requestSender';
import {PostFormState} from '../../../../../elements/posts/form/types';
import {AnalysisFormDragon} from './main';
import {generatePayload} from './utils';


export const AnalysisFormDragonNew = () => {
  const {lang} = useI18n();
  const {data} = useSession();

  const {analysis} = useBackupSelector();
  const dispatch = useDispatch();

  const [formState, setFormState] = React.useState<PostFormState<DragonAnalysisPublishPayload>>({
    payload: overrideObject(generatePayload(lang, data?.user.id.toString()), analysis.dragon),
    isIdAvailable: false,
    isPreloaded: false,
  });

  return (
    <AnalysisFormDragon
      formState={formState}
      setFormState={setFormState}
      fnSendRequest={ApiRequestSender.analysisPublishDragon}
      onSubmitSuccess={() => dispatch(backupDispatchers.clearDragonAnalysis())}
      onUpdated={(payload) => {
        const {uid, ...rest} = payload;
        dispatch(backupDispatchers.backupDragonAnalysis(rest));
      }}
    />
  );
};

import React from 'react';

import {useSession} from 'next-auth/react';

import {CharaAnalysisPublishPayload} from '../../../../../../api-def/api';
import {useI18n} from '../../../../../../i18n/hook';
import {backupDispatchers} from '../../../../../../state/backup/dispatchers';
import {useBackupSelector} from '../../../../../../state/backup/selector';
import {useDispatch} from '../../../../../../state/store';
import {overrideObject} from '../../../../../../utils/override';
import {ApiRequestSender} from '../../../../../../utils/services/api/requestSender';
import {PostFormState} from '../../../../../elements/posts/form/types';
import {AnalysisFormChara} from './main';
import {generatePayload} from './utils';


export const AnalysisFormCharaNew = () => {
  const {lang} = useI18n();
  const {data} = useSession();

  const {analysis} = useBackupSelector();
  const dispatch = useDispatch();

  const [formState, setFormState] = React.useState<PostFormState<CharaAnalysisPublishPayload>>({
    payload: overrideObject(generatePayload(lang, data?.user.id.toString()), analysis.chara),
    isIdAvailable: false,
    isPreloaded: false,
  });

  return (
    <AnalysisFormChara
      formState={formState}
      setFormState={setFormState}
      fnSendRequest={ApiRequestSender.analysisPublishChara}
      onSubmitSuccess={() => dispatch(backupDispatchers.clearCharaAnalysis())}
      onUpdated={(payload) => {
        const {uid, ...rest} = payload;
        dispatch(backupDispatchers.backupCharaAnalysis(rest));
      }}
    />
  );
};

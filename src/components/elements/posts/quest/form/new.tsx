import React from 'react';

import {QuestPostPublishPayload} from '../../../../../api-def/api';
import {AppReactContext} from '../../../../../context/app/main';
import {useI18n} from '../../../../../i18n/hook';
import {backupDispatchers} from '../../../../../state/backup/dispatchers';
import {useBackupSelector} from '../../../../../state/backup/selector';
import {useDispatch} from '../../../../../state/store';
import {overrideObject} from '../../../../../utils/override';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {PostFormState} from '../../shared/form/types';
import {QuestPostForm} from './main';
import {generatePayload} from './utils';


export const QuestNewForm = () => {
  const {lang} = useI18n();
  const context = React.useContext(AppReactContext);

  const {quest} = useBackupSelector();
  const dispatch = useDispatch();

  const [formState, setFormState] = React.useState<PostFormState<QuestPostPublishPayload>>({
    payload: overrideObject(generatePayload(lang, context?.session?.user.id.toString()), quest),
    isIdAvailable: true,
    isPreloaded: false,
  });

  return (
    <QuestPostForm
      formState={formState}
      setFormState={setFormState}
      fnSendRequest={ApiRequestSender.questPublish}
      onSubmitSuccess={() => dispatch(backupDispatchers.clearQuestGuide())}
      onUpdated={(payload) => {
        const {uid, ...rest} = payload;
        dispatch(backupDispatchers.backupQuestGuide(rest));
      }}
    />
  );
};

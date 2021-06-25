import React from 'react';

import {QuestPostPublishPayload} from '../../../../../api-def/api';
import {AppReactContext} from '../../../../../context/app/main';
import {useI18n} from '../../../../../i18n/hook';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {generateNewPositionInfo} from '../../../../../utils/services/api/utils';
import {PostFormState} from '../../shared/form/types';
import {QuestPostForm} from './main';


export const QuestNewForm = () => {
  const {lang} = useI18n();
  const context = React.useContext(AppReactContext);

  const [formState, setFormState] = React.useState<PostFormState<QuestPostPublishPayload>>({
    payload: {
      uid: context?.session?.user.id.toString() || '',
      lang: lang,
      title: '',
      video: '',
      general: '',
      positional: [
        generateNewPositionInfo(),
      ],
      addendum: '',
    },
    isIdAvailable: true,
    isPreloaded: false,
  });

  return (
    <QuestPostForm
      formState={formState}
      setFormState={setFormState}
      fnSendRequest={ApiRequestSender.questPublish}
    />
  );
};

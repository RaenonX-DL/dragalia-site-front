import React from 'react';

import {QuestPostPublishPayload} from '../../../src/api-def/api';
import {QuestPostForm} from '../../../src/components/elements/posts/quest/form/main';
import {PostFormState} from '../../../src/components/elements/posts/shared/form/types';
import {useI18n} from '../../../src/i18n/hook';
import {CookiesControl} from '../../../src/utils/cookies';
import {ApiRequestSender} from '../../../src/utils/services/api/requestSender';
import {generateNewPositionInfo} from '../../../src/utils/services/api/utils';


const QuestNew = () => {
  const {lang} = useI18n();

  const [formState, setFormState] = React.useState<PostFormState<QuestPostPublishPayload>>({
    payload: {
      googleUid: CookiesControl.getGoogleUid() || '',
      lang: lang,
      title: '',
      video: '',
      general: '',
      positional: [
        generateNewPositionInfo(),
      ],
      addendum: '',
    },
    isIdAvailable: false,
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

export default QuestNew;


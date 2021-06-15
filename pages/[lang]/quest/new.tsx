import React from 'react';

import {QuestPostPublishPayload} from '../../../src/api-def/api';
import {QuestPostForm} from '../../../src/components/elements/posts/quest/form/main';
import {PostFormState} from '../../../src/components/elements/posts/shared/form/types';
import {ProtectedLayout} from '../../../src/components/pages/layout/protected';
import {AppReactContext} from '../../../src/context/app/main';
import {useI18n} from '../../../src/i18n/hook';
import {ApiRequestSender} from '../../../src/utils/services/api/requestSender';
import {generateNewPositionInfo} from '../../../src/utils/services/api/utils';


const QuestNew = () => {
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
    isIdAvailable: false,
    isPreloaded: false,
  });

  return (
    <ProtectedLayout>
      <QuestPostForm
        formState={formState}
        setFormState={setFormState}
        fnSendRequest={ApiRequestSender.questPublish}
      />
    </ProtectedLayout>
  );
};

export default QuestNew;

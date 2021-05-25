import React from 'react';

import {QuestPostPublishPayload} from '../../../../api-def/api';
import {useI18n} from '../../../../i18n/hook';
import {CookiesControl} from '../../../../utils/cookies';
import {
  ApiRequestSender,
  generateNewPositionInfo,
} from '../../../../utils/services/api';
import {QuestPostForm} from '../../../elements';
import {PostFormState} from '../../../elements/posts/shared/form/types';
import {PageProps} from '../../props';

export const QuestNew = ({fnSetTitle}: PageProps) => {
  const {t, lang} = useI18n();

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

  fnSetTitle(t((t) => t.meta.inUse.questNew.title));

  return (
    <QuestPostForm
      formState={formState}
      setFormState={setFormState}
      fnSendRequest={ApiRequestSender.questPostPublish}
    />
  );
};

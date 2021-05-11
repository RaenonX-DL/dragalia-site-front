import React from 'react';

import {useTranslation} from '../../../../i18n/utils';
import {CookiesControl} from '../../../../utils/cookies';
import {
  ApiRequestSender,
  generateNewPositionInfo,
  QuestPostPublishPayload,
} from '../../../../utils/services/api';
import {QuestPostForm} from '../../../elements';
import {PostFormState} from '../../../elements/posts/shared/form/types';
import {PageProps} from '../../props';

export const QuestNew = ({fnSetTitle}: PageProps) => {
  const {t, lang} = useTranslation();

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

  fnSetTitle(t('pages.name.quest_new'));

  return (
    <QuestPostForm
      formState={formState}
      setFormState={setFormState}
      fnSendRequest={ApiRequestSender.questPostPublish}
    />
  );
};

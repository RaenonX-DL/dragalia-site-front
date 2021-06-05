import React from 'react';

import {QuestPostEditPayload, QuestPostGetResponse} from '../../../../../api-def/api';
import {CookiesKeys} from '../../../../../utils/cookies/keys';
import {getCookies} from '../../../../../utils/cookies/utils';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {PostEditCommon} from '../../shared/form/edit';
import {PostFormState} from '../../shared/form/types';
import {QuestPostForm} from './main';


type Props<R extends QuestPostGetResponse> = {
  post: R,
}

export const QuestEditForm = <R extends QuestPostGetResponse>({post}: Props<R>) => {
  const [formState, setFormState] = React.useState<PostFormState<QuestPostEditPayload>>({
    payload: {
      googleUid: getCookies(CookiesKeys.GOOGLE_UID) || '',
      seqId: post.seqId,
      lang: post.lang,
      title: post.title,
      video: post.video,
      general: post.general,
      positional: post.positional,
      addendum: post.addendum,
      editNote: '',
    },
    isIdAvailable: false,
    isPreloaded: true,
  });

  return (
    <QuestPostForm
      formState={formState}
      setFormState={setFormState}
      fnSendRequest={ApiRequestSender.questEdit}
      renderOnPreloaded={(setPayload) => (
        <PostEditCommon
          formState={formState}
          setPayload={setPayload}
        />
      )}
    />
  );
};

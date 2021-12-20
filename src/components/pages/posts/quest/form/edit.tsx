import React from 'react';

import {QuestPostEditPayload, QuestPostGetResponse} from '../../../../../api-def/api';
import {AppReactContext} from '../../../../../context/app/main';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {PostEditCommon} from '../../../../elements/posts/form/edit';
import {PostFormState} from '../../../../elements/posts/form/types';
import {QuestPostForm} from './main';


type Props<R extends QuestPostGetResponse> = {
  post: R,
};

export const QuestEditForm = <R extends QuestPostGetResponse>({post}: Props<R>) => {
  const context = React.useContext(AppReactContext);

  const [formState, setFormState] = React.useState<PostFormState<QuestPostEditPayload>>({
    payload: {
      // Explicit to avoid passing unwanted properties
      uid: context?.session?.user.id.toString() || '',
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

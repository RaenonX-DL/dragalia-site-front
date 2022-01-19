import React from 'react';

import {useSession} from 'next-auth/react';

import {MiscPostEditPayload, MiscPostGetResponse} from '../../../../../api-def/api';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {PostEditCommon} from '../../../../elements/posts/form/edit';
import {PostFormState} from '../../../../elements/posts/form/types';
import {MiscPostForm} from './main';


type Props<R extends MiscPostGetResponse> = {
  post: R,
};

export const MiscEditForm = <R extends MiscPostGetResponse>({post}: Props<R>) => {
  const {data} = useSession();
  const [formState, setFormState] = React.useState<PostFormState<MiscPostEditPayload>>({
    payload: {
      // Explicit to avoid passing unwanted properties
      uid: data?.user.id.toString() || '',
      seqId: post.seqId,
      lang: post.lang,
      title: post.title,
      sections: post.sections,
      editNote: '',
    },
    isIdAvailable: false,
    isPreloaded: true,
  });

  return (
    <MiscPostForm
      formState={formState}
      setFormState={setFormState}
      fnSendRequest={ApiRequestSender.miscEdit}
      renderOnPreloaded={(setPayload) => (
        <PostEditCommon
          formState={formState}
          setPayload={setPayload}
        />
      )}
    />
  );
};

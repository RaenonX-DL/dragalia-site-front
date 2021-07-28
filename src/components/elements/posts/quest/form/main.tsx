import React from 'react';

import {
  QuestPostEditResponse,
  QuestPostPublishPayload,
  QuestPostPublishResponse,
} from '../../../../../api-def/api';
import {PostPath} from '../../../../../const/path/definitions';
import {useI18n} from '../../../../../i18n/hook';
import {makePostPath} from '../../../../../utils/path/make';
import {processText} from '../../../../../utils/process/text';
import {ApiRequestSender} from '../../../../../utils/services/api';
import {PostFormBase} from '../../shared/form/base';
import {FormSequencedMeta} from '../../shared/form/meta/sequenced';
import {FormNotes} from '../../shared/form/notes';
import {PostFormProps} from '../../shared/form/types';
import {FormAddendum} from './addendum';
import {FormGeneralInfo} from './general';
import {FormPositional} from './position';


export type QuestPostWriteResponse = QuestPostEditResponse | QuestPostPublishResponse;

export const QuestPostForm = <P extends QuestPostPublishPayload, R extends QuestPostWriteResponse>({
  formState,
  setFormState,
  ...props
}: PostFormProps<P, R>) => {
  const {t, lang} = useI18n();

  return (
    <PostFormBase
      formState={formState}
      setFormState={setFormState}
      fnGetRedirectPath={(pid) => makePostPath(PostPath.QUEST, {pid, lang})}
      fnGetRedirectId={(response) => response.seqId}
      fnProcessPayload={async (payload) => ({
        ...payload,
        general: await processText({text: payload.general, lang}),
        video: await processText({text: payload.video, lang}),
        positional: await Promise.all(payload.positional.map(async (position) => ({
          position: position.position,
          rotations: await processText({text: position.rotations, lang}),
          builds: await processText({text: position.builds, lang}),
          tips: await processText({text: position.tips, lang}),
        }))),
        addendum: await processText({text: payload.addendum, lang}),
      })}
      renderMain={(setPayload) => (
        <>
          <FormNotes/>
          <FormSequencedMeta
            formState={formState}
            setPayload={setPayload}
            setAvailability={(isIdAvailable) => setFormState({...formState, isIdAvailable})}
            titlePlaceholder={t((t) => t.posts.quest.title)}
            fnIdCheck={ApiRequestSender.questIdCheck}
          />
          <hr/>
          <FormGeneralInfo formState={formState} setPayload={setPayload}/>
          <hr/>
          <FormPositional formState={formState} setState={setFormState}/>
          <hr/>
          <FormAddendum formState={formState} setPayload={setPayload}/>
        </>
      )}
      {...props}
    />
  );
};

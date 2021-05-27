import React from 'react';

import {
  QuestPostEditResponse,
  QuestPostPublishPayload,
  QuestPostPublishResponse,
} from '../../../../../api-def/api';
import {makePostPath, PostPath} from '../../../../../const/path';
import {useI18n} from '../../../../../i18n/hook';
import {ApiRequestSender} from '../../../../../utils/services/api';
import {PostFormBase} from '../../shared/form/base';
import {FormSequencedMeta} from '../../shared/form/meta/sequenced';
import {FormNotes} from '../../shared/form/notes';
import {PostFormProps} from '../../shared/form/types';
import {FormAddendum} from './addendum';
import {FormGeneralInfo} from './general';
import {FormPositional} from './position';


type QuestPostWriteResponse = QuestPostEditResponse | QuestPostPublishResponse;

export const QuestPostForm = <P extends QuestPostPublishPayload, R extends QuestPostWriteResponse>({
  formState,
  setFormState,
  fnSendRequest,
  renderOnPreloaded,
}: PostFormProps<P, R>) => {
  const {t, lang} = useI18n();

  return (
    <PostFormBase
      formState={formState}
      setFormState={setFormState}
      fnSendRequest={fnSendRequest}
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
      renderOnPreloaded={renderOnPreloaded}
      fnGetRedirectPath={(pid) => makePostPath(PostPath.ANALYSIS, {pid, lang})}
      fnGetRedirectId={(response) => response.seqId}
    />
  );
};

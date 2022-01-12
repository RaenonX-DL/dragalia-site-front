import React from 'react';

import {MiscPostEditResponse, MiscPostPublishPayload, MiscPostPublishResponse} from '../../../../../api-def/api';
import {makePostUrl, PostPath} from '../../../../../api-def/paths';
import {useI18n} from '../../../../../i18n/hook';
import {processText} from '../../../../../utils/process/text';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {ArrayForm} from '../../../../elements/form/array/main';
import {PostFormBase} from '../../../../elements/posts/form/base';
import {FormSequencedMeta} from '../../../../elements/posts/form/meta/sequenced';
import {FormNotes} from '../../../../elements/posts/form/notes';
import {PostFormProps} from '../../../../elements/posts/form/types';
import {MiscSectionUnit} from './unit';


export type MiscPostWriteResponse = MiscPostEditResponse | MiscPostPublishResponse;

export const MiscPostForm = <P extends MiscPostPublishPayload, R extends MiscPostWriteResponse>({
  formState,
  setFormState,
  ...props
}: PostFormProps<P, R>) => {
  const {t, lang} = useI18n();

  return (
    <PostFormBase
      formState={formState}
      setFormState={setFormState}
      fnGetRedirectUrl={(pid) => makePostUrl(PostPath.MISC, {pid, lang})}
      fnGetRedirectId={(response) => response.seqId}
      fnProcessPayload={async (payload) => ({
        ...payload,
        sections: await Promise.all(payload.sections.map(async (section) => ({
          title: section.title,
          content: await processText({text: section.content, lang}),
        }))),
      })}
      renderMain={(setPayload) => (
        <>
          <FormNotes/>
          <FormSequencedMeta
            formState={formState}
            setPayload={setPayload}
            setAvailability={(isIdAvailable) => setFormState({...formState, isIdAvailable})}
            titlePlaceholder={t((t) => t.posts.quest.title)}
            fnIdCheck={ApiRequestSender.miscIdCheck}
          />
          <hr/>
          <ArrayForm
            payload={formState.payload}
            minLength={1}
            getArray={(payload) => payload.sections}
            setArray={(newSection) => setPayload('sections', newSection)}
            getUpdatedElement={(element, key, value) => ({...element, [key]: value})}
            generateNewElement={() => ({title: '', content: ''})}
            renderEntries={(element, onChange) => (
              <MiscSectionUnit section={element} onContentChanged={onChange}/>
            )}
          />
        </>
      )}
      {...props}
    />
  );
};

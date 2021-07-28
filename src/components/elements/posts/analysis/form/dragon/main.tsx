import React from 'react';

import {
  AnalysisPublishResponse,
  DragonAnalysisPublishPayload,
} from '../../../../../../api-def/api';
import {useI18n} from '../../../../../../i18n/hook';
import {processText} from '../../../../../../utils/process/text';
import {PostFormProps} from '../../../shared/form/types';
import {AnalysisFormBase} from '../base';
import {DragonAnalysisForm} from './body';


type Props<P extends DragonAnalysisPublishPayload, R extends AnalysisPublishResponse> = PostFormProps<P, R>;

export const AnalysisFormDragon = <P extends DragonAnalysisPublishPayload, R extends AnalysisPublishResponse>({
  formState,
  fnProcessPayload,
  ...props
}: Props<P, R>) => {
  const {lang} = useI18n();

  return (
    <AnalysisFormBase
      formState={formState}
      fnProcessPayload={async (payload) => ({
        ...payload,
        ...(fnProcessPayload ? await fnProcessPayload(payload) : {}),
        ultimate: await processText({text: payload.ultimate, lang}),
        notes: await processText({text: payload.notes, lang}),
        suitableCharacters: await processText({text: payload.suitableCharacters, lang}),
      })}
      renderMain={(setPayload) => (
        <DragonAnalysisForm
          formState={formState}
          setPayload={setPayload}
        />
      )}
      {...props}
    />
  );
};

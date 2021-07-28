import React from 'react';

import {
  AnalysisPublishResponse,
  CharaAnalysisPublishPayload,
} from '../../../../../../api-def/api';
import {useI18n} from '../../../../../../i18n/hook';
import {processText} from '../../../../../../utils/process/text';
import {PostFormProps} from '../../../shared/form/types';
import {AnalysisFormBase} from '../base';
import {CharaAnalysisForm} from './body';


type Props<P extends CharaAnalysisPublishPayload, R extends AnalysisPublishResponse> = PostFormProps<P, R>;

export const AnalysisFormChara = <P extends CharaAnalysisPublishPayload, R extends AnalysisPublishResponse>({
  formState,
  setFormState,
  fnProcessPayload,
  ...props
}: Props<P, R>) => {
  const {lang} = useI18n();

  return (
    <AnalysisFormBase
      formState={formState}
      setFormState={setFormState}
      fnProcessPayload={async (payload) => ({
        ...payload,
        ...(fnProcessPayload ? await fnProcessPayload(payload) : {}),
        forceStrikes: await processText({text: payload.forceStrikes, lang}),
        skills: await Promise.all(payload.skills.map(async (skill) => ({
          name: skill.name,
          info: await processText({text: skill.info, lang}),
          tips: await processText({text: skill.tips, lang}),
          rotations: await processText({text: skill.rotations, lang}),
        }))),
        tipsBuilds: await processText({text: payload.tipsBuilds, lang}),
      })}
      renderMain={(setPayload) => (
        <CharaAnalysisForm
          formState={formState}
          setState={setFormState}
          setPayload={setPayload}
        />
      )}
      {...props}
    />
  );
};

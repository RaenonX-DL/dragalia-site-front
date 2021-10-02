import React from 'react';

import {AnalysisBody, AnalysisEditResponse, AnalysisPublishResponse} from '../../../../../api-def/api';
import {PostPath} from '../../../../../const/path/definitions';
import {useI18n} from '../../../../../i18n/hook';
import {makePostUrl} from '../../../../../utils/path/make';
import {processText} from '../../../../../utils/process/text';
import {PostFormBase} from '../../../../elements/posts/form/base';
import {PostFormBaseProps} from '../../../../elements/posts/form/types';
import {FormBottom} from './bottom';
import {FormAnalysisMeta} from './meta';
import {FormTop} from './top';


export const AnalysisFormBase = <P extends AnalysisBody, R extends AnalysisEditResponse | AnalysisPublishResponse>({
  formState,
  fnProcessPayload,
  renderMain,
  ...props
}: PostFormBaseProps<P, R>) => {
  const {lang} = useI18n();

  return (
    <PostFormBase
      formState={formState}
      renderMain={(setPayload, setAvailability) => (
        <>
          <FormAnalysisMeta
            formState={formState}
            setPayload={setPayload}
            setAvailability={setAvailability}
          />
          <hr/>
          <FormTop formState={formState} setPayload={setPayload}/>
          {renderMain(setPayload, setAvailability)}
          <FormBottom formState={formState} setPayload={setPayload}/>
        </>
      )}
      fnGetRedirectUrl={(pid) => makePostUrl(PostPath.ANALYSIS, {pid, lang})}
      fnGetRedirectId={(response) => response.unitId}
      fnProcessPayload={async (payload) => ({
        ...payload,
        ...(fnProcessPayload ? await fnProcessPayload(payload) : {}),
        summary: await processText({text: payload.summary, lang}),
        summonResult: await processText({text: payload.summonResult, lang}),
        passives: await processText({text: payload.passives, lang}),
        normalAttacks: await processText({text: payload.normalAttacks, lang}),
        videos: await processText({text: payload.videos, lang}),
      })}
      {...props}
    />
  );
};

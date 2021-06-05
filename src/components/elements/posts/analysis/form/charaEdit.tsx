import React from 'react';

import {AnalysisEditResponse, CharaAnalysisBody, CharaAnalysisEditPayload} from '../../../../../api-def/api';
import {CookiesKeys} from '../../../../../utils/cookies/keys';
import {getCookies} from '../../../../../utils/cookies/utils';
import {PostEditCommon} from '../../shared/form/edit';
import {PostFormFetchProps, PostFormState} from '../../shared/form/types';
import {AnalysisFormBase} from './base';
import {CharaAnalysisForm} from './charaBody';


type AnalysisFormCharaEditProps<P extends CharaAnalysisEditPayload, R extends AnalysisEditResponse> =
  PostFormFetchProps<P, R> & {
  initialAnalysis: CharaAnalysisBody,
}

export const AnalysisFormCharaEdit = ({
  initialAnalysis, fnSendRequest,
}: AnalysisFormCharaEditProps<CharaAnalysisEditPayload, AnalysisEditResponse>) => {
  const [formState, setFormState] = React.useState<PostFormState<CharaAnalysisEditPayload>>({
    payload: {
      ...initialAnalysis,
      googleUid: getCookies(CookiesKeys.GOOGLE_UID) || '',
      editNote: '',
    },
    isIdAvailable: true,
    isPreloaded: true,
  });

  return (
    <AnalysisFormBase
      formState={formState}
      setFormState={setFormState}
      fnSendRequest={fnSendRequest}
      renderMain={(setPayload) => (
        <CharaAnalysisForm
          formState={formState}
          setState={setFormState}
          setPayload={setPayload}
        />
      )}
      renderOnPreloaded={(setPayload) => (
        <PostEditCommon
          formState={formState}
          setPayload={setPayload}
        />
      )}
    />
  );
};

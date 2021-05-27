import React from 'react';

import {AnalysisEditResponse, DragonAnalysisBody, DragonAnalysisEditPayload} from '../../../../../api-def/api';
import {CookiesControl} from '../../../../../utils/cookies';
import {PostEditCommon} from '../../shared/form/edit';
import {PostFormFetchProps, PostFormState} from '../../shared/form/types';
import {AnalysisFormBase} from './base';
import {DragonAnalysisForm} from './dragonBody';


type AnalysisFormDragonEditProps<P extends DragonAnalysisEditPayload, R extends AnalysisEditResponse> =
  PostFormFetchProps<P, R> & {
  initialAnalysis: DragonAnalysisBody,
}

export const AnalysisFormDragonEdit = ({
  initialAnalysis, fnSendRequest,
}: AnalysisFormDragonEditProps<DragonAnalysisEditPayload, AnalysisEditResponse>) => {
  const [formState, setFormState] = React.useState<PostFormState<DragonAnalysisEditPayload>>({
    payload: {
      ...initialAnalysis,
      googleUid: CookiesControl.getGoogleUid() || '',
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
        <DragonAnalysisForm
          formState={formState}
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

import React from 'react';

import {AnalysisPublishResponse, CharaAnalysisPublishPayload} from '../../../../../api-def/api';
import {PostFormFetchProps, PostFormState} from '../../shared/form/types';
import {AnalysisFormBase} from './base';
import {CharaAnalysisForm} from './charaBody';

type AnalysisFormCharaNewProps<P extends CharaAnalysisPublishPayload, R extends AnalysisPublishResponse> =
  PostFormFetchProps<P, R> & {
  initialPayload: P,
}

export const AnalysisFormCharaNew = <P extends CharaAnalysisPublishPayload, R extends AnalysisPublishResponse>({
  initialPayload, fnSendRequest,
}: AnalysisFormCharaNewProps<P, R>) => {
  const [formState, setFormState] = React.useState<PostFormState<P>>({
    payload: initialPayload,
    isIdAvailable: true,
    isPreloaded: false,
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
    />
  );
};

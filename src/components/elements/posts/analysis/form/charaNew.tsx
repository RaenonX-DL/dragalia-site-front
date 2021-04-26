import React from 'react';

import {CharaAnalysisPublishPayload} from '../../../../../api-def/api';
import {PostFormFetchProps, PostFormState} from '../../shared/form/types';
import {AnalysisFormBase} from './base';
import {CharaAnalysisForm} from './charaBody';

type AnalysisFormCharaNewProps<P extends CharaAnalysisPublishPayload> =
  PostFormFetchProps<P> & {
  initialPayload: P,
}

export const AnalysisFormCharaNew = <P extends CharaAnalysisPublishPayload>({
  initialPayload, fnSendRequest,
}: AnalysisFormCharaNewProps<P>) => {
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

import React from 'react';

import {AnalysisPublishResponse, DragonAnalysisPublishPayload} from '../../../../../api-def/api';
import {PostFormFetchProps, PostFormState} from '../../shared/form/types';
import {AnalysisFormBase} from './base';
import {DragonAnalysisForm} from './dragonBody';

type AnalysisFormDragonNewProps<P extends DragonAnalysisPublishPayload, R extends AnalysisPublishResponse> =
  PostFormFetchProps<P, R> & {
  initialPayload: P,
}

export const AnalysisFormDragonNew = <P extends DragonAnalysisPublishPayload, R extends AnalysisPublishResponse>({
  initialPayload, fnSendRequest,
}: AnalysisFormDragonNewProps<P, R>) => {
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
        <DragonAnalysisForm
          formState={formState}
          setPayload={setPayload}
        />
      )}
    />
  );
};

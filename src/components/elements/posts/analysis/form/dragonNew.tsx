import React from 'react';

import {DragonAnalysisPublishPayload} from '../../../../../api-def/api';
import {PostFormFetchProps, PostFormState} from '../../shared/form/types';
import {AnalysisFormBase} from './base';
import {DragonAnalysisForm} from './dragonBody';

type AnalysisFormDragonNewProps<P extends DragonAnalysisPublishPayload> =
  PostFormFetchProps<P> & {
  initialPayload: P,
}

export const AnalysisFormDragonNew = <P extends DragonAnalysisPublishPayload>({
  initialPayload, fnSendRequest,
}: AnalysisFormDragonNewProps<P>) => {
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

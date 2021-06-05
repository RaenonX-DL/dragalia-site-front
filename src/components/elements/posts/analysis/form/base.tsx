import React from 'react';

import {AnalysisBody, AnalysisEditResponse, AnalysisPublishResponse} from '../../../../../api-def/api';
import {makePostPath, PostPath} from '../../../../../const/path';
import {PostFormBase} from '../../shared/form/base';
import {PostFormBaseProps} from '../../shared/form/types';
import {FormBottom} from './bottom';
import {FormAnalysisMeta} from './meta';
import {FormTop} from './top';


export const AnalysisFormBase = <P extends AnalysisBody, R extends AnalysisEditResponse | AnalysisPublishResponse>({
  formState,
  setFormState,
  fnSendRequest,
  renderMain,
  renderOnPreloaded,
}: PostFormBaseProps<P, R>) => {
  return (
    <PostFormBase
      formState={formState}
      setFormState={setFormState}
      fnSendRequest={fnSendRequest}
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
      renderOnPreloaded={renderOnPreloaded}
      fnGetRedirectPath={(pid) => makePostPath(PostPath.ANALYSIS, {pid})}
      fnGetRedirectId={(response) => response.unitId}
    />
  );
};

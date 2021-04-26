import React from 'react';

import {AnalysisPayload} from '../../../../../api-def/api';
import Path from '../../../../../const/path/definitions';
import {useTranslation} from '../../../../../i18n/utils';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {PostFormBase} from '../../shared/form/base';
import {FormMeta} from '../../shared/form/meta';
import {FormNotes} from '../../shared/form/notes';
import {PostFormBaseProps} from '../../shared/form/types';
import {FormBottom} from './bottom';
import {FormTop} from './top';


export const AnalysisFormBase = <P extends AnalysisPayload>({
  formState,
  setFormState,
  fnSendRequest,
  renderMain,
  renderOnPreloaded,
}: PostFormBaseProps<P>) => {
  const {t} = useTranslation();

  return (
    <PostFormBase
      formState={formState}
      setFormState={setFormState}
      fnSendRequest={fnSendRequest}
      renderMain={(setPayload, setAvailability) => (
        <>
          <FormNotes/>
          <FormMeta
            formState={formState}
            setPayload={setPayload}
            setAvailability={setAvailability}
            titlePlaceholder={t('posts.analysis.unit_name')}
            fnIdCheck={ApiRequestSender.analysisPostIdCheck}
          />
          <hr/>
          <FormTop formState={formState} setPayload={setPayload}/>
          {renderMain(setPayload, setAvailability)}
          <FormBottom formState={formState} setPayload={setPayload}/>
        </>
      )}
      renderOnPreloaded={renderOnPreloaded}
      fnGetRedirectPath={Path.getAnalysis}
    />
  );
};

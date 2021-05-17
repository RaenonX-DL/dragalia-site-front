import React from 'react';

import {AnalysisPayload} from '../../../../../api-def/api';
import {makePostPath, PostPath} from '../../../../../const/path';
import {useI18n} from '../../../../../i18n/hook';
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
  const {t, lang} = useI18n();

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
            titlePlaceholder={t((t) => t.posts.analysis.unitName)}
            fnIdCheck={ApiRequestSender.analysisPostIdCheck}
          />
          <hr/>
          <FormTop formState={formState} setPayload={setPayload}/>
          {renderMain(setPayload, setAvailability)}
          <FormBottom formState={formState} setPayload={setPayload}/>
        </>
      )}
      renderOnPreloaded={renderOnPreloaded}
      fnGetRedirectPath={(pid) => makePostPath(PostPath.ANALYSIS, {pid, lang})}
    />
  );
};

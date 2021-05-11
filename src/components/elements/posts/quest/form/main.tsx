import React from 'react';

import Path from '../../../../../const/path/definitions';
import {useTranslation} from '../../../../../i18n/utils';
import {ApiRequestSender, QuestPostPayload} from '../../../../../utils/services/api';
import {PostFormBase} from '../../shared/form/base';
import {FormMeta} from '../../shared/form/meta';
import {PostFormProps} from '../../shared/form/types';
import {FormAddendum} from './sectionAddendum';
import {FormGeneralInfo} from './sectionGeneral';
import {FormHeader} from './sectionHeader';
import {FormPositional} from './sectionPositional';


export const QuestPostForm = <P extends QuestPostPayload>({
  formState,
  setFormState,
  fnSendRequest,
  renderOnPreloaded,
}: PostFormProps<P>) => {
  const {t} = useTranslation();

  return (
    <PostFormBase
      formState={formState}
      setFormState={setFormState}
      fnSendRequest={fnSendRequest}
      renderMain={(setPayload) => (
        <>
          <FormHeader/>
          <FormMeta
            formState={formState}
            setPayload={setPayload}
            setAvailability={(isIdAvailable) => setFormState({...formState, isIdAvailable})}
            titlePlaceholder={t('posts.quest.title')}
            fnIdCheck={ApiRequestSender.questPostIdCheck}
          />
          <hr/>
          <FormGeneralInfo formState={formState} setPayload={setPayload}/>
          <hr/>
          <FormPositional formState={formState} setState={setFormState}/>
          <hr/>
          <FormAddendum formState={formState} setPayload={setPayload}/>
        </>
      )}
      renderOnPreloaded={renderOnPreloaded}
      fnGetRedirectPath={Path.getAnalysis}
    />
  );
};

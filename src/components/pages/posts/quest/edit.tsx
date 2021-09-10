import React from 'react';

import {ApiRequestSender} from '../../../../utils/services/api/requestSender';
import {PrefetchedForm} from '../../../elements/form/prefetched/main';
import {QuestEditForm} from './form/edit';


export const QuestEdit = () => {
  return (
    <PrefetchedForm
      fnFetch={ApiRequestSender.questGet}
      renderOnSuccess={(response) => <QuestEditForm post={response}/>}
    />
  );
};

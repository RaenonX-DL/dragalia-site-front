import React from 'react';

import {ApiRequestSender} from '../../../../utils/services/api/requestSender';
import {PrefetchedForm} from '../../../elements/form/prefetched/main';
import {QuestPostOutput} from './output/main';


export const QuestPage = () => {
  return (
    <PrefetchedForm
      fnFetch={ApiRequestSender.questGet}
      renderOnSuccess={(response) => <QuestPostOutput post={response}/>}
    />
  );
};

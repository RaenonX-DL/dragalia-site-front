import React from 'react';

import {ApiRequestSender} from '../../../../utils/services/api/requestSender';
import {PrefetchedForm} from '../../../elements/form/prefetched/main';
import {MiscEditForm} from './form/edit';


export const MiscEdit = () => {
  return (
    <PrefetchedForm
      fnFetch={ApiRequestSender.miscGet}
      renderOnSuccess={(response) => <MiscEditForm post={response}/>}
    />
  );
};

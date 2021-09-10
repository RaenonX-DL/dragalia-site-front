import React from 'react';

import {ApiRequestSender} from '../../../../utils/services/api/requestSender';
import {PrefetchedForm} from '../../../elements/form/prefetched/main';
import {MiscPostOutput} from './output/main';


export const MiscPage = () => {
  return (
    <PrefetchedForm
      fnFetch={ApiRequestSender.miscGet}
      renderOnSuccess={(response) => <MiscPostOutput post={response}/>}
    />
  );
};

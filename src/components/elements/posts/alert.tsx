import React from 'react';

import Alert from 'react-bootstrap/Alert';

import {useI18n} from '../../../i18n/hook';


type FetchFailedProps = {
  failureMessage: string,
}

export const AlertFetchListFailed = ({failureMessage}: FetchFailedProps) => {
  const {t} = useI18n();

  return (
    <Alert variant="danger">{
      t((t) => t.posts.manage.fetchListFailed, {error: failureMessage})
    }</Alert>
  );
};

import React from 'react';

import {Alert} from 'react-bootstrap';

import {useTranslation} from '../../../../i18n/utils';

type FetchFailedProps = {
  failureMessage: string,
}

export const AlertFetchFailed = ({failureMessage}: FetchFailedProps) => {
  const {t} = useTranslation();

  return (
    <Alert variant="danger">
      {t('posts.manage.fetch_post_failed', {error: failureMessage})}
    </Alert>
  );
};

export const AlertFetchListFailed = ({failureMessage}: FetchFailedProps) => {
  const {t} = useTranslation();

  return (
    <Alert variant="danger">{
      t('posts.manage.fetch_list_failed', {error: failureMessage})
    }</Alert>
  );
};

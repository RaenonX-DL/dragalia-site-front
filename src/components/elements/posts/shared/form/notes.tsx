import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {useTranslation} from '../../../../../i18n/utils';

export const FormNotes = () => {
  const {t} = useTranslation();

  return (
    <Row>
      <Col className="m-3 p-3 rounded bg-black-32">{t('posts.manage.add_note')}</Col>
    </Row>
  );
};

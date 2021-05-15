import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {useI18n} from '../../../../../i18n/hook';

export const FormHeader = () => {
  const {t} = useI18n();

  return (
    <Row>
      <Col className="m-3 p-3 rounded bg-black-32">{t((t) => t.posts.manage.addNote)}</Col>
    </Row>
  );
};

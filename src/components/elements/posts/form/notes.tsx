import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useI18n} from '../../../../i18n/hook';


export const FormNotes = () => {
  const {t} = useI18n();

  return (
    <Row>
      <Col className="m-3 p-3 rounded bg-black-32">{t((t) => t.posts.manage.addNote)}</Col>
    </Row>
  );
};

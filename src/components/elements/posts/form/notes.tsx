import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useI18n} from '../../../../i18n/hook';


export const FormNotes = () => {
  const {t} = useI18n();

  return (
    <Row className="mb-3">
      <Col>
        <div className="section">
          {t((t) => t.posts.manage.addNote)}
        </div>
      </Col>
    </Row>
  );
};

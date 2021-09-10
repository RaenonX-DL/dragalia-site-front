import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useI18n} from '../src/i18n/hook';


const Error404 = () => {
  const {t} = useI18n();

  return (
    <Row>
      <Col className="text-center text-danger">
        <span className="h2">{t((t) => t.meta.error['404'].description)}</span>
      </Col>
    </Row>
  );
};

export default Error404;

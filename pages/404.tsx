import React from 'react';

import {Col, Container, Row} from 'react-bootstrap';

import {useI18n} from '../src/i18n/hook';


const Error404 = () => {
  const {t} = useI18n();

  return (
    <Container className="p-3">
      <Row>
        <Col className="text-center text-danger">
          <span className="h2">{t((t) => t.meta.error['404'].description)}</span>
        </Col>
      </Row>
    </Container>
  );
};

export default Error404;

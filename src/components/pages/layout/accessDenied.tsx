import React from 'react';

import {Col, Container, Row} from 'react-bootstrap';

import {useI18n} from '../../../i18n/hook';


export const AccessDenied = () => {
  const {t} = useI18n();

  return (
    <Container className="p-3">
      <Row>
        <Col className="text-center text-danger">
          <span className="h2">{t((t) => t.meta.error['401'].description)}</span>
        </Col>
      </Row>
    </Container>
  );
};

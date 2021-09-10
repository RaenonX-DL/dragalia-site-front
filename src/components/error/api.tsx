import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {ApiResponseCode} from '../../api-def/api';


type Props = {
  responseCode: ApiResponseCode
}

export const ApiError = ({responseCode}: Props) => {
  return (
    <Row>
      <Col className="text-center text-danger">
        <span className="h2">{ApiResponseCode[responseCode]}</span>
      </Col>
    </Row>
  );
};

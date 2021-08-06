import React, {MouseEventHandler} from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


type Props = {
  onAdded: MouseEventHandler,
}

export const ArrayAddButtonRow = ({onAdded}: Props) => (
  <Row className="mt-2">
    <Col>
      <Button
        className="d-inline float-right"
        variant="outline-success"
        onClick={onAdded}
      >
        <i className="bi bi-plus-lg"/>
      </Button>
    </Col>
  </Row>
);
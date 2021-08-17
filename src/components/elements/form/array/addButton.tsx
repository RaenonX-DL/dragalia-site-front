import React, {MouseEventHandler} from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {IconAdd} from '../../common/icons';


type Props = {
  onAdded: MouseEventHandler,
}

export const ArrayAddButtonRow = ({onAdded}: Props) => (
  <Row className="mb-2">
    <Col>
      <Button
        className="d-inline float-right"
        variant="outline-success"
        onClick={onAdded}
      >
        <IconAdd/>
      </Button>
    </Col>
  </Row>
);

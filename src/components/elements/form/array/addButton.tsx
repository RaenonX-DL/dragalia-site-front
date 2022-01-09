import React, {MouseEventHandler} from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {IconAdd} from '../../common/icons';


type Props = {
  onAdded: MouseEventHandler,
  onTop: boolean,
};

export const ArrayAddButtonRow = ({onAdded, onTop}: Props) => (
  <Row className={onTop ? 'mb-2' : 'mt-2'}>
    <Col className="text-end">
      <Button
        variant="outline-success"
        onClick={onAdded}
        size="sm"
      >
        <IconAdd/>
      </Button>
    </Col>
  </Row>
);

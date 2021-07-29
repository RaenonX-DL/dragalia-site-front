import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


type Props = {
  onAdded: () => void,
  onRemoved: () => void,
  isRemoveAllowed: () => boolean,
}

export const ArrayControl = ({
  onAdded,
  onRemoved,
  isRemoveAllowed,
}: Props) => {
  return (
    <Row className="mt-2">
      <Col>
        <Button
          className="d-inline float-right ml-2"
          variant="outline-danger"
          onClick={onRemoved}
          disabled={!isRemoveAllowed()}
        >
          <i className="bi bi-x-lg"/>
        </Button>
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
};

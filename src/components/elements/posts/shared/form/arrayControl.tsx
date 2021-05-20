import React from 'react';

import {Button, Col, Row} from 'react-bootstrap';

import {useI18n} from '../../../../../i18n/hook';


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
  const {t} = useI18n();

  return (
    <Row className="mt-2">
      <Col>
        <Button
          className="d-inline float-right ml-2"
          variant="outline-danger"
          onClick={onRemoved}
          disabled={!isRemoveAllowed()}
        >
          {t((t) => t.misc.remove)}
        </Button>
        <Button
          className="d-inline float-right"
          variant="outline-success"
          onClick={onAdded}
        >
          {t((t) => t.misc.add)}
        </Button>
      </Col>
    </Row>
  );
};

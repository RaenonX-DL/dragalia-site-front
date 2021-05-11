import React from 'react';

import {Button, Col, Row} from 'react-bootstrap';

import {useTranslation} from '../../../../../i18n/utils';


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
  const {t} = useTranslation();

  return (
    <Row className="mt-2">
      <Col>
        <Button
          className="d-inline float-right ml-2"
          variant="outline-danger"
          onClick={onRemoved}
          disabled={isRemoveAllowed()}
        >
          {t('misc.remove')}
        </Button>
        <Button
          className="d-inline float-right"
          variant="outline-success"
          onClick={onAdded}
        >
          {t('misc.add')}
        </Button>
      </Col>
    </Row>
  );
};

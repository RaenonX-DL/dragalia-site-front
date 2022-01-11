import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import {ButtonVariant} from 'react-bootstrap/types';


export type SubmitTextKey = 'text' | 'loading';

type SubmitTextLookup = {[K in SubmitTextKey]: React.ReactNode};

export type AjaxFormControlProps = {
  submitTextKey: SubmitTextKey,
  submitText: string,
  renderAtLeft?: React.ReactNode,
  variant: ButtonVariant,
  disabled?: boolean,
};

export const AjaxFormControl = ({
  submitTextKey,
  submitText,
  renderAtLeft,
  disabled,
  ...props
}: AjaxFormControlProps) => {
  const submitTextLookup: SubmitTextLookup = {
    text: submitText,
    loading: <Spinner animation="grow" size="sm"/>,
  };

  return (
    <Row className="text-end">
      <Col>
        {renderAtLeft}
        <Button type="submit" className="ms-2" disabled={submitTextKey === 'loading' || disabled} {...props}>
          {submitTextLookup[submitTextKey]}
        </Button>
      </Col>
    </Row>
  );
};

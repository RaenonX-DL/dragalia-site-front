import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import {ButtonVariant} from 'react-bootstrap/types';


export type SubmitTextKey = 'text' | 'loading'

type SubmitTextLookup = {[K in SubmitTextKey]: React.ReactNode}

export type AjaxFormControlProps = {
  submitTextKey: SubmitTextKey,
  submitText: string,
  renderAtLeft?: React.ReactNode,
  loading: boolean,
  variant: ButtonVariant,
  disabled?: boolean,
}

export const AjaxFormControl = ({
  submitTextKey,
  submitText,
  renderAtLeft,
  loading,
  ...props
}: AjaxFormControlProps) => {
  const submitTextLookup: SubmitTextLookup = {
    text: submitText,
    loading: <Spinner animation="grow" size="sm"/>,
  };

  return (
    <Row noGutters className="text-right">
      <Col>
        {renderAtLeft}
        <Button type="submit" className="ml-2" disabled={loading || submitTextKey === 'loading'} {...props}>
          {submitTextLookup[submitTextKey]}
        </Button>
      </Col>
    </Row>
  );
};

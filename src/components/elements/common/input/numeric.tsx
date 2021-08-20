import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import {InfoPopover} from '../overlay/info';
import {DetailedProps, InputProps} from '../types';


export type NumericInputProps<T> = DetailedProps & InputProps<T, number> & {
  required?: boolean,
  minValue?: number,
  maxValue?: number
}

export const NumericInput = <T, >({
  title,
  description,
  inputData,
  setInputData,
  getValue,
  getUpdatedInputData,
  minValue,
  maxValue,
  required = true,
}: NumericInputProps<T>) => {
  if (minValue && maxValue && minValue > maxValue) {
    console.warn(`Min value ${minValue} should not be greater than max value (${maxValue}).`);
  }

  return (
    <Row className="mb-3">
      <Form.Label column className="text-center">
        {title}&nbsp;<InfoPopover title={title} description={description}/>
      </Form.Label>
      <Col>
        <Form.Control
          type="number"
          value={getValue(inputData)}
          min={minValue}
          max={maxValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const val = parseFloat(e.target.value);

            let newValue = Math.min(e.target.max ? parseFloat(e.target.max) : Infinity, val);
            newValue = Math.max(e.target.min ? parseFloat(e.target.min) : -Infinity, newValue);

            setInputData(getUpdatedInputData(newValue));
          }}
          required={required}
        />
      </Col>
    </Row>
  );
};

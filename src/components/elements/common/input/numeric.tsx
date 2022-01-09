import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {FloatingInput} from '../../form/control/floating/input';
import {InfoPopover} from '../overlay/info';
import {DetailedProps, InputPropsExtended} from '../types';


export type NumericInputProps<T> = DetailedProps & InputPropsExtended<T, number> & {
  required?: boolean,
  minValue?: number,
  maxValue?: number
};

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
    <Row className="mb-3 g-2">
      <Col>
        <FloatingInput
          type="number"
          value={Number(getValue(inputData)).toString()}
          min={minValue}
          max={maxValue}
          onChange={(e) => {
            const val = parseFloat(e.target.value);

            let newValue = Math.min(e.target.max ? parseFloat(e.target.max) : Infinity, val);
            newValue = Math.max(e.target.min ? parseFloat(e.target.min) : -Infinity, newValue);

            setInputData(getUpdatedInputData(newValue));
          }}
          label={title}
          required={required}
        />
      </Col>
      <Col xs="auto" className="d-flex align-self-end">
        <InfoPopover title={title} description={description}/>
      </Col>
    </Row>
  );
};

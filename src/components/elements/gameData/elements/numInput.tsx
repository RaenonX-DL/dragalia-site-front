import React from 'react';

import {Col, Form, Row} from 'react-bootstrap';

import {OverlayPopover} from '../../common/overlay/popover';
import {InputProps} from './props';
import {DetailedProps} from './types';


type NumericInputProps<K extends string, T extends { [key in K]: number }> =
  DetailedProps &
  InputProps<K, number, T> & {
  required?: boolean,
  minValue?: number,
  maxValue?: number
}

export const NumericInput = <K extends string, T extends { [key in K]: number }>({
  title,
  description,
  inputData,
  inputKey,
  setInputData,
  minValue,
  maxValue,
  required = true,
}: NumericInputProps<K, T>) => {
  if (minValue && maxValue && minValue > maxValue) {
    console.warn(`Min value ${minValue} should not be greater than max value (${maxValue}).`);
  }

  return (
    <Row className="mb-3">
      <OverlayPopover title={title} content={description}>
        <Form.Label column className="text-center">{title}</Form.Label>
      </OverlayPopover>
      <Col>
        <Form.Control
          type="number"
          value={inputData[inputKey]}
          name={inputKey}
          min={minValue}
          max={maxValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const val = parseFloat(e.target.value);

            let newValue = Math.min(e.target.max ? parseFloat(e.target.max) : Infinity, val);
            newValue = Math.max(e.target.min ? parseFloat(e.target.min) : -Infinity, newValue);

            setInputData({
              ...inputData,
              [inputKey]: newValue,
            });
          }}
          required={required}
        />
      </Col>
    </Row>
  );
};

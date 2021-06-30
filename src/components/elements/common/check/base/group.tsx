import React from 'react';

import Form from 'react-bootstrap/Form';

import {CheckItemProps} from '../types';
import {CheckItem} from './item';


type Props<E> = {
  options: Array<E>,
  optionToProps: (entry: E) => CheckItemProps,
}

export const CheckGroup = <E, >({
  options,
  optionToProps,
}: Props<E>) => {
  return (
    <Form.Group className="mb-3 text-center">
      {options.map((option, idx) => <CheckItem key={idx} {...optionToProps(option)}/>)}
    </Form.Group>
  );
};

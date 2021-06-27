import React from 'react';

import {InputProps} from '../../types';
import {CheckItem} from '../base/item';
import {CheckItemProps} from '../types';


export type CheckboxInputProps<T> = InputProps<T, boolean> & Pick<CheckItemProps, 'text'>

export const CheckboxInput = <T, >({
  text,
  inputData,
  setInputData,
  getValue,
  getUpdatedInputData,
}: CheckboxInputProps<T>) => {
  return (
    <CheckItem
      text={text}
      type="checkbox"
      checked={getValue(inputData)}
      onChange={(checked) => setInputData(getUpdatedInputData(checked))}
    />
  );
};

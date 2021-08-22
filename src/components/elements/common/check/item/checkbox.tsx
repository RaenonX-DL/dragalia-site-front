import React from 'react';

import {InputPropsExtended} from '../../types';
import {CheckItem} from '../base/item';
import {CheckItemProps} from '../types';


export type CheckboxInputProps<T> = InputPropsExtended<T, boolean> & Pick<CheckItemProps, 'text' | 'disabled'>

export const CheckboxInput = <T, >({
  inputData,
  setInputData,
  getValue,
  getUpdatedInputData,
  ...props
}: CheckboxInputProps<T>) => {
  return (
    <CheckItem
      type="checkbox"
      checked={getValue(inputData)}
      onChange={(checked) => setInputData(getUpdatedInputData(checked))}
      {...props}
    />
  );
};

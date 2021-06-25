import React from 'react';

import {ChecksProps} from './checksBase';
import {CustomChecksBase} from './customBase';
import {CheckEntry} from './types';


type CustomRadiosProps<K extends string, V, T extends { [key in K]: V }> = ChecksProps<CheckEntry, K, V, T>

export const CustomRadios = <K extends string, T extends { [key in K]: number }>({
  options,
  inputData,
  inputKey,
  setInputData,
}: CustomRadiosProps<K, number, T>) => {
  return (
    <CustomChecksBase
      options={options}
      type="radio"
      groupName={inputKey}
      onChange={(checked, code) => {
        if (!checked) {
          return;
        }
        setInputData({
          ...inputData,
          [inputKey]: code,
        });
      }}
      isChecked={(code) => inputData[inputKey] === code}
    />
  );
};

import React from 'react';

import {ChecksProps} from './checksBase';
import {CustomChecksBase} from './customBase';
import {CheckEntry} from './types';

type CustomBoxedProps<K extends string, V, T extends { [key in K]: V }> = ChecksProps<CheckEntry, K, V, T>

export const CustomBoxes = <K extends string, T extends { [key in K]: Array<number> }>({
  options,
  inputData,
  inputKey,
  setInputData,
}: CustomBoxedProps<K, Array<number>, T>) => {
  return (
    <CustomChecksBase
      options={options}
      type="checkbox"
      groupName={inputKey}
      onChange={(checked, code) => setInputData({
        ...inputData,
        [inputKey]: checked ?
          inputData[inputKey].concat([code]) :
          inputData[inputKey].filter((dataCode) => dataCode !== code),
      })}
      isChecked={(code) => inputData[inputKey].includes(code)}
    />
  );
};

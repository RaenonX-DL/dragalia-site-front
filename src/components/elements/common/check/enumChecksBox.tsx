import React from 'react';

import {EnumEntry} from '../../../../api-def/resources';
import {ChecksProps} from './checksBase';
import {EnumChecks, EnumChecksProps} from './enumChecks';


type EnumChecksBoxProps<K extends string, T extends { [key in K]: Array<number> }> =
  EnumChecksProps<K, Array<number>, T> &
  ChecksProps<EnumEntry, K, Array<number>, T>

export const EnumChecksBox = <K extends string, T extends { [key in K]: Array<number> }>({
  options,
  inputData,
  inputKey,
  setInputData,
  imageHeight,
}: EnumChecksBoxProps<K, T>) => {
  return (
    <EnumChecks
      inputData={inputData}
      inputKey={inputKey}
      options={options}
      onChange={(code, checked) => setInputData({
        ...inputData,
        [inputKey]: checked ?
          inputData[inputKey].concat([code]) :
          inputData[inputKey].filter((dataCode) => dataCode !== code),
      })}
      isChecked={(code) => inputData[inputKey].includes(code)}
      imageHeight={imageHeight}
      type="checkbox"
    />
  );
};

import React from 'react';

import {EnumEntry} from '../../../../utils/services/resources/types';
import {ChecksProps} from './checksBase';
import {EnumChecks, EnumChecksProps} from './enumChecks';


type EnumChecksRadioProps<K extends string, T extends { [key in K]: number }> =
  EnumChecksProps<K, number, T> &
  ChecksProps<EnumEntry, K, number, T>

export const EnumChecksRadio = <K extends string, T extends { [key in K]: number }>({
  options,
  inputData,
  inputKey,
  setInputData,
  imageHeight,
}: EnumChecksRadioProps<K, T>) => {
  return (
    <EnumChecks
      inputData={inputData}
      inputKey={inputKey}
      options={options}
      onChange={(code, checked) => {
        if (!checked) {
          return;
        }
        setInputData({
          ...inputData,
          [inputKey]: code,
        });
      }}
      isChecked={(code) => inputData[inputKey] === code}
      imageHeight={imageHeight}
      type="radio"
    />
  );
};

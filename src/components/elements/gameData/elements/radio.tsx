import React from 'react';

import {ChecksBase, ChecksProps} from './checksBase';
import {InlineCheckBase} from './inlineCheckBase';

type RadioCheckLabel = {
  label: string,
  code: number
}

type RadioChecksProps<K extends string, V, T extends { [key in K]: V }> = ChecksProps<RadioCheckLabel, K, V, T>

export const RadioChecks = <K extends string, T extends { [key in K]: number }>({
  options,
  inputData,
  inputKey,
  setInputData,
}: RadioChecksProps<K, number, T>) => {
  return (
    <ChecksBase
      options={options}
      renderCheckItem={({label, code}: RadioCheckLabel) => (
        <InlineCheckBase
          titleLabel={label}
          groupName={inputKey}
          type="radio"
          key={label}
          onChange={(code) => () => setInputData({
            ...inputData,
            [inputKey]: code,
          })}
          checked={inputData[inputKey] === code}
        />
      )}
    />
  );
};

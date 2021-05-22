import React from 'react';

import {InputProps} from '../props';
import {TitledProps} from '../types';
import {InlineCheckBase, InlineCheckBaseProps} from './inlineCheckBase';


type InlineCheckProps<K extends string, T extends { [key in K]: boolean }> =
  TitledProps &
  Partial<InlineCheckBaseProps> &
  InputProps<K, boolean, T>


export const InlineCheck = <K extends string, T extends { [key in K]: boolean }>({
  title,
  inputData,
  inputKey,
  setInputData,
  ...props
}: InlineCheckProps<K, T>) => {
  return (
    <InlineCheckBase
      {...props}
      title={title}
      groupName={inputKey}
      checked={inputData[inputKey]}
      onChange={(checked) => setInputData({...inputData, [inputKey]: checked})}
    />
  );
};

import React from 'react';

import {ChecksBase} from './checksBase';
import {InlineCheckBase} from './inlineCheckBase';
import {CheckEntry, CheckType} from './types';


type CustomRadiosProps = {
  options: Array<CheckEntry>,
  type: CheckType,
  groupName: string,
  onChange: (checked: boolean, code: number) => void,
  isChecked: (code: number) => boolean,
}

export const CustomChecksBase = ({
  options,
  type,
  groupName,
  onChange,
  isChecked,
}: CustomRadiosProps) => {
  return (
    <ChecksBase
      options={options}
      renderCheckItem={({text, code}: CheckEntry) => (
        <InlineCheckBase
          title={text}
          groupName={groupName}
          type={type}
          key={text}
          onChange={(checked) => onChange(checked, code)}
          checked={isChecked(code)}
        />
      )}
    />
  );
};

import React from 'react';

import {EnumEntry} from '../../../../api-def/resources';
import {CheckOption} from '../../common/check/types';
import {InputPanelEntry} from './entry';
import {InputPanelProps} from './types';


export const InputPanel = <E extends CheckOption, E2 extends EnumEntry, T, V>({
  inputEntries,
  inputData,
  setInputData,
}: InputPanelProps<E, E2, T, V>) => {
  return (
    <>
      {inputEntries.map((inputEntry, idx) => (
        <InputPanelEntry
          key={idx}
          inputEntry={inputEntry}
          inputData={inputData}
          setInputData={setInputData}
        />
      ))}
    </>
  );
};

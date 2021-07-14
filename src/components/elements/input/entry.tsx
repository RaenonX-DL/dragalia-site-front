import React from 'react';

import {EnumEntry} from '../../../api-def/resources';
import {EnumCheckboxGroup} from '../common/check/enum/checkbox';
import {EnumRadioGroup} from '../common/check/enum/radio';
import {RadioGroup} from '../common/check/group/radio';
import {CheckboxInput} from '../common/check/item/checkbox';
import {CheckOption} from '../common/check/types';
import {NumericInput} from '../common/input/numeric';
import {SectionSubTitle} from '../gameData/elements/subTitle';
import {SectionTitle} from '../gameData/elements/title';
import {InputEntryProps} from './types';


export const InputPanelEntry = <E extends CheckOption, E2 extends EnumEntry, T>({
  inputEntry,
  inputData,
  setInputData,
}: InputEntryProps<E, E2, T>) => {
  if (inputEntry.type === 'title') {
    return <SectionTitle title={inputEntry.title} description={inputEntry.description}/>;
  }
  if (inputEntry.type === 'subTitle') {
    return <SectionSubTitle title={inputEntry.title} description={inputEntry.description}/>;
  }
  if (inputEntry.type === 'separator') {
    return <hr/>;
  }
  if (inputEntry.type === 'inputNumber') {
    return (
      <NumericInput
        {...inputEntry}
        title={inputEntry.title}
        description={inputEntry.description}
        inputData={inputData}
        setInputData={setInputData}
      />
    );
  }
  if (inputEntry.type === 'inputCheckGroup') {
    return (
      <div className="mb-2 text-center">
        {
          inputEntry.checkboxes.map((checkboxProps, index) => (
            <CheckboxInput
              key={index}
              {...checkboxProps}
              inputData={inputData}
              setInputData={setInputData}
            />
          ))
        }
      </div>
    );
  }
  if (inputEntry.type === 'inputRadioGroup') {
    return (
      <RadioGroup
        {...inputEntry}
        inputData={inputData}
        setInputData={setInputData}
      />
    );
  }
  if (inputEntry.type === 'enumCheckGroup') {
    return (
      <EnumCheckboxGroup
        {...inputEntry}
        inputData={inputData}
        setInputData={setInputData}
      />
    );
  }
  if (inputEntry.type === 'enumRadioGroup') {
    return (
      <EnumRadioGroup
        {...inputEntry}
        inputData={inputData}
        setInputData={setInputData}
      />
    );
  }

  throw new Error(`Unhandled input entry: ${inputEntry}`);
};

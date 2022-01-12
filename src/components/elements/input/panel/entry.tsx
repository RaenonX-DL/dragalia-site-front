import React from 'react';

import ProgressBar from 'react-bootstrap/ProgressBar';

import {EnumEntry} from '../../../../api-def/resources';
import {EnumCheckboxGroup} from '../../common/check/enum/checkbox';
import {EnumRadioGroup} from '../../common/check/enum/radio';
import {CheckGroup} from '../../common/check/group/check';
import {IndividualCheckGroup} from '../../common/check/group/checkIndividual';
import {RadioGroup} from '../../common/check/group/radio';
import {CheckOption} from '../../common/check/types';
import {NumericInput} from '../../common/input/numeric';
import {SectionSubTitle} from '../../gameData/subTitle';
import {SectionTitle} from '../../gameData/title';
import {InputSelectEntry} from '../element/select';
import {InputEntryProps} from './types';


export const InputPanelEntry = <E extends CheckOption, E2 extends EnumEntry, T, V>({
  inputEntry,
  inputData,
  setInputData,
}: InputEntryProps<E, E2, T, V>) => {
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
    return <CheckGroup {...inputEntry} inputData={inputData} setInputData={setInputData}/>;
  }
  if (inputEntry.type === 'inputRadioGroup') {
    return <RadioGroup {...inputEntry} inputData={inputData} setInputData={setInputData}/>;
  }
  if (inputEntry.type === 'individualCheckGroup') {
    return <IndividualCheckGroup {...inputEntry} inputData={inputData} setInputData={setInputData}/>;
  }
  if (inputEntry.type === 'enumCheckGroup') {
    return <EnumCheckboxGroup {...inputEntry} inputData={inputData} setInputData={setInputData}/>;
  }
  if (inputEntry.type === 'enumRadioGroup') {
    return <EnumRadioGroup {...inputEntry} inputData={inputData} setInputData={setInputData}/>;
  }
  if (inputEntry.type === 'select') {
    return <InputSelectEntry {...inputEntry} inputData={inputData} setInputData={setInputData}/>;
  }
  if (inputEntry.type === 'progress') {
    return <ProgressBar now={inputEntry.value} className="mb-3" {...inputEntry}/>;
  }

  throw new Error(`Unhandled input entry: ${inputEntry}`);
};

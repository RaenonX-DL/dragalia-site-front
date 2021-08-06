import React from 'react';

import {UnitType} from '../../../../../../api-def/api';
import {useI18n} from '../../../../../../i18n/hook';
import {CheckboxGroup} from '../../../../../elements/common/check/group/checkbox';
import {CheckOption} from '../../../../../elements/common/check/types';
import {InputData} from './types';


type TypePickerProps = {
  inputData: InputData,
  setInputData: React.Dispatch<React.SetStateAction<InputData>>,
}

export const UnitTypePicker = ({inputData, setInputData}: TypePickerProps) => {
  const {t} = useI18n();

  const unitTypes: Array<CheckOption & {code: UnitType}> = [
    {
      text: t((t) => t.posts.analysis.type.character),
      code: UnitType.CHARACTER,
    },
    {
      text: t((t) => t.posts.analysis.type.dragon),
      code: UnitType.DRAGON,
    },
  ];

  return (
    <CheckboxGroup
      options={unitTypes}
      inputData={inputData}
      setInputData={setInputData}
      getValue={(inputData) => inputData.types}
      getUpdatedInputData={(types) => ({...inputData, types})}
      getCheckOptionComparer={(option) => option.code}
    />
  );
};

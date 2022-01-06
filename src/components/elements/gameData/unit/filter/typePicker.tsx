import React from 'react';

import {UnitType} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {RadioGroup} from '../../../common/check/group/radio';
import {CheckOption} from '../../../common/check/types';
import {UnitFilterInputData} from './types';


type TypePickerProps<S extends string, D extends UnitFilterInputData<S>> = {
  inputData: D,
  setInputData: React.Dispatch<React.SetStateAction<D>>,
};

export const UnitTypePicker = <S extends string, D extends UnitFilterInputData<S>>({
  inputData,
  setInputData,
}: TypePickerProps<S, D>) => {
  const {t} = useI18n();

  const unitTypes: Array<CheckOption & {code: UnitType}> = [
    {
      text: t((t) => t.enum.unitType[UnitType.CHARACTER]),
      code: UnitType.CHARACTER,
    },
    {
      text: t((t) => t.enum.unitType[UnitType.DRAGON]),
      code: UnitType.DRAGON,
    },
  ];

  return (
    <RadioGroup
      options={unitTypes}
      inputData={inputData}
      setInputData={setInputData}
      getValue={(inputData) => inputData.type}
      getValueOfOption={(option) => option.code}
      getUpdatedInputData={(type) => ({...inputData, type})}
      groupName="unitType"
    />
  );
};

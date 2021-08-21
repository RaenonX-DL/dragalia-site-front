import React from 'react';

import {UnitType} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {CheckboxGroup} from '../../../common/check/group/checkbox';
import {CheckOption} from '../../../common/check/types';
import {UnitFilterInputData} from './types';


type TypePickerProps<S extends string, D extends UnitFilterInputData<S>> = {
  inputData: D,
  setInputData: React.Dispatch<React.SetStateAction<D>>,
}

export const UnitTypePicker = <S extends string, D extends UnitFilterInputData<S>>({
  inputData,
  setInputData,
}: TypePickerProps<S, D>) => {
  const {t} = useI18n();

  const unitTypes: Array<CheckOption & {code: UnitType}> = [
    {
      text: t((t) => t.misc.unitType[UnitType.CHARACTER]),
      code: UnitType.CHARACTER,
    },
    {
      text: t((t) => t.misc.unitType[UnitType.DRAGON]),
      code: UnitType.DRAGON,
    },
  ];

  return (
    <CheckboxGroup
      options={unitTypes}
      inputData={inputData}
      setInputData={setInputData}
      getValue={(inputData) => inputData.types}
      getValueOfOption={(option) => option.code}
      getUpdatedInputData={(types) => ({...inputData, types})}
    />
  );
};

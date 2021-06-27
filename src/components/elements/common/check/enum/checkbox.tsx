import React from 'react';

import {DepotPaths, EnumEntry} from '../../../../../api-def/resources';
import {useI18n} from '../../../../../i18n/hook';
import {CheckboxGroup} from '../group/checkbox';
import {CheckboxGroupProps} from '../types';


export type EnumChecksBoxProps<E extends EnumEntry, T> = Omit<CheckboxGroupProps<E, T>, 'getCheckOptionComparer'>

export const EnumCheckboxGroup = <E extends EnumEntry, T>({
  options,
  inputData,
  setInputData,
  getValue,
  getUpdatedInputData,
  imageHeight,
}: EnumChecksBoxProps<E, T>) => {
  const {lang} = useI18n();

  return (
    <CheckboxGroup
      options={options.map((option) => ({...option, text: option.trans[lang]}))}
      inputData={inputData}
      setInputData={setInputData}
      getValue={getValue}
      getUpdatedInputData={getUpdatedInputData}
      getCheckOptionComparer={(option) => option.code}
      getImageUrl={(option) => option.imagePath ? DepotPaths.getImageURL(option.imagePath) : undefined}
      imageHeight={imageHeight}
    />
  );
};

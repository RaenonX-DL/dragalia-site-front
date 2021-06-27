import React from 'react';

import {DepotPaths, EnumEntry} from '../../../../../api-def/resources';
import {useI18n} from '../../../../../i18n/hook';
import {RadioGroup} from '../group/radio';
import {RadioGroupProps} from '../types';


type EnumRadioGroupProps<E extends EnumEntry, T> = Omit<RadioGroupProps<E, T>, 'getCheckOptionComparer'>

export const EnumRadioGroup = <E extends EnumEntry, T>({
  options,
  inputData,
  setInputData,
  getValue,
  getUpdatedInputData,
  groupName,
  imageHeight,
}: EnumRadioGroupProps<E, T>) => {
  const {lang} = useI18n();

  return (
    <RadioGroup
      options={options.map((option) => ({...option, text: option.trans[lang]}))}
      inputData={inputData}
      setInputData={setInputData}
      getValue={getValue}
      getUpdatedInputData={getUpdatedInputData}
      getCheckOptionComparer={(option) => option.code}
      getImageUrl={(option) => option.imagePath ? DepotPaths.getImageURL(option.imagePath) : undefined}
      groupName={groupName}
      imageHeight={imageHeight}
    />
  );
};

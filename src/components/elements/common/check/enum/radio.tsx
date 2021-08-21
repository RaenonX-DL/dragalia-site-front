import React from 'react';

import {DepotPaths, EnumEntry} from '../../../../../api-def/resources';
import {useI18n} from '../../../../../i18n/hook';
import {RadioGroup} from '../group/radio';
import {RadioGroupProps} from '../types';


export type EnumRadioGroupProps<E extends EnumEntry, T> = Omit<RadioGroupProps<E, T, number>, 'getValueOfOption'>

export const EnumRadioGroup = <E extends EnumEntry, T>({
  options,
  ...props
}: EnumRadioGroupProps<E, T>) => {
  const {lang} = useI18n();

  return (
    <RadioGroup
      options={options.map((option) => ({...option, text: option.trans[lang]}))}
      getValueOfOption={(option) => option.code}
      getImageUrl={(option) => option.imagePath ? DepotPaths.getImageURL(option.imagePath) : undefined}
      {...props}
    />
  );
};

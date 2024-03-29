import React from 'react';

import {CheckItemGroup} from '../base/group';
import {CheckboxGroupProps, CheckOption} from '../types';


export const CheckGroup = <E extends CheckOption, T, V>({
  options,
  inputData,
  setInputData,
  getValue,
  getValueOfOption,
  getUpdatedInputData,
  getImageUrl,
  imageHeight,
}: CheckboxGroupProps<E, T, V>) => {
  return (
    <CheckItemGroup
      options={options}
      optionToProps={(option) => ({
        type: 'checkbox',
        onChange: (checked) => {
          const currentValue = getValue(inputData);
          const optionValue = getValueOfOption(option);

          setInputData(getUpdatedInputData(checked ?
            currentValue.concat([optionValue]) :
            currentValue.filter((option) => option !== optionValue),
          ));
        },
        checked: getValue(inputData).includes(getValueOfOption(option)),
        text: option.text,
        image: {
          height: imageHeight,
          url: getImageUrl && getImageUrl(option),
        },
      })}
    />
  );
};

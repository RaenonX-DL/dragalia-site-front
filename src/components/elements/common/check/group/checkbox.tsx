import React from 'react';

import {CheckGroup} from '../base/group';
import {CheckboxGroupProps, CheckOption} from '../types';


export const CheckboxGroup = <E extends CheckOption, T>({
  options,
  inputData,
  setInputData,
  getValue,
  getUpdatedInputData,
  getCheckOptionComparer,
  getImageUrl,
  imageHeight,
}: CheckboxGroupProps<E, T>) => {
  return (
    <CheckGroup
      options={options}
      optionToProps={(option) => ({
        type: 'checkbox',
        onChange: (checked) => {
          const currentValue = getValue(inputData);
          const currentOption = getCheckOptionComparer(option);

          setInputData(getUpdatedInputData(checked ?
            currentValue.concat([currentOption]) :
            currentValue.filter((option) => option !== currentOption),
          ));
        },
        checked: getValue(inputData).includes(getCheckOptionComparer(option)),
        text: option.text,
        image: {
          height: imageHeight,
          url: getImageUrl && getImageUrl(option),
        },
      })}
    />
  );
};

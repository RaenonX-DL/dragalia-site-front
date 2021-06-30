import React from 'react';

import {CheckGroup} from '../base/group';
import {CheckOption, RadioGroupProps} from '../types';


export const RadioGroup = <E extends CheckOption, T>({
  options,
  inputData,
  setInputData,
  getValue,
  getUpdatedInputData,
  getCheckOptionComparer,
  getImageUrl,
  groupName,
  imageHeight,
}: RadioGroupProps<E, T>) => {
  return (
    <CheckGroup
      options={options}
      optionToProps={(option) => ({
        type: 'radio',
        onChange: (checked) => {
          if (!checked) {
            return;
          }

          setInputData(getUpdatedInputData(getCheckOptionComparer(option)));
        },
        checked: getValue(inputData) === getCheckOptionComparer(option),
        text: option.text,
        groupName,
        image: {
          height: imageHeight,
          url: getImageUrl && getImageUrl(option),
        },
      })}
    />
  );
};

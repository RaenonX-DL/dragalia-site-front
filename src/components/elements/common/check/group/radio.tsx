import React from 'react';

import {CheckItemGroup} from '../base/group';
import {CheckOption, RadioGroupProps} from '../types';


export const RadioGroup = <E extends CheckOption, T, V>({
  options,
  inputData,
  setInputData,
  getValue,
  getValueOfOption,
  getUpdatedInputData,
  getImageUrl,
  groupName,
  imageHeight,
}: RadioGroupProps<E, T, V>) => {
  return (
    <CheckItemGroup
      options={options}
      optionToProps={(option) => ({
        type: 'radio',
        onChange: (checked) => {
          if (!checked) {
            return;
          }

          setInputData(getUpdatedInputData(getValueOfOption(option)));
        },
        checked: getValue(inputData) === getValueOfOption(option),
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

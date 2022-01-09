import React from 'react';

import {InputEntryIndividualCheckGroup} from '../../../input/panel/types';
import {InputProps} from '../../types';
import {CheckItemGroup} from '../base/group';


type Props<T> = Pick<InputEntryIndividualCheckGroup<T>, 'checkboxes'> & InputProps<T>;

export const IndividualCheckGroup = <T, >({checkboxes, inputData, setInputData}: Props<T>) => {
  return (
    <CheckItemGroup
      options={checkboxes}
      optionToProps={({getUpdatedInputData, getValue, text, disabled, block}) => ({
        type: 'checkbox',
        onChange: (checked) => setInputData(getUpdatedInputData(checked)),
        checked: getValue(inputData),
        text,
        disabled,
        block,
      })}
    />
  );
};

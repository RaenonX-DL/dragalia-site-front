import React from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import {useI18n} from '../../../../../i18n/hook';
import {useAtkSkillInput} from '../hooks/preset';
import {InputData, SortBy} from '../in/types';
import {overwriteInputData} from '../in/utils/inputData';
import {orderName} from './lookup';


type Props = {
  onOrderPicked: (newInputData: InputData) => void,
}

export const AttackingSkillSorter = ({onOrderPicked}: Props) => {
  const {t} = useI18n();

  const {inputData, setInputData} = useAtkSkillInput();

  const sortBy = t(orderName[inputData.sortBy]);
  const title = t((t) => t.game.skillAtk.sort.text, {sortBy});

  const onItemPicked = (sortBy: SortBy) => () => {
    const newInputData = overwriteInputData(inputData, {sortBy});
    setInputData(newInputData);

    onOrderPicked(newInputData);
  };

  return (
    <DropdownButton title={title} variant="outline-light">
      {Object.entries(orderName).map(([sortBy, getNameFunc], idx) => (
        <Dropdown.Item key={idx} onClick={onItemPicked(sortBy as SortBy)}>
          {t(getNameFunc)}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

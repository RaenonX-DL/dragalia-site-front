import React from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import {useI18n} from '../../../../../i18n/hook';
import {InputData, SortBy} from '../in/types';
import {overrideInputData} from '../in/utils/inputData';
import {orderName} from './lookup';


type Props = {
  inputData: InputData,
  onOrderPicked: (newInputData: InputData) => void,
};

export const AttackingSkillSorter = ({inputData, onOrderPicked}: Props) => {
  const {t} = useI18n();

  const sortBy = t(orderName[inputData.sortBy]);
  const title = t((t) => t.game.skillAtk.sort.text, {sortBy});

  const onItemPicked = (sortBy: SortBy) => () => {
    const newInputData = overrideInputData(inputData, {sortBy});
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

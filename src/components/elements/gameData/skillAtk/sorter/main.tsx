import React from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import {useI18n} from '../../../../../i18n/hook';
import {InputData, SortBy} from '../in/types';
import {orderName} from './lookup';


type Props = {
  inputData: InputData,
  onOrderPicked: (order: SortBy) => void,
}

export const AttackingSkillSorter = ({inputData, onOrderPicked}: Props) => {
  const {t} = useI18n();

  const sortBy = t(orderName[inputData.sortBy]);
  const title = t((t) => t.game.skillAtk.sort.text, {sortBy});

  return (
    <DropdownButton title={title} variant="outline-light">
      {Object.entries(orderName).map(([sortBy, getNameFunc], idx) => (
        <Dropdown.Item key={idx} onClick={() => onOrderPicked(sortBy as SortBy)}>
          {t(getNameFunc)}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

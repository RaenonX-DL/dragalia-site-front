import React from 'react';

import {useI18n} from '../../../../../i18n/hook';
import {DropdownButton} from '../../../../elements/common/button/dropdown';
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

  const onItemPicked = (sortBy: SortBy) => {
    const newInputData = overrideInputData(inputData, {sortBy});
    onOrderPicked(newInputData);
  };

  return (
    <DropdownButton
      title={title}
      variant="outline-light"
      options={Object.entries(orderName)}
      isActive={([sortBy]) => sortBy === inputData.sortBy}
      onClick={([sortBy]) => onItemPicked(sortBy as SortBy)}
      getOptionText={([_, getNameFunc]) => t(getNameFunc)}
    />
  );
};

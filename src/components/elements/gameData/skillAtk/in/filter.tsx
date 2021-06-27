import React from 'react';

import {useI18n} from '../../../../../i18n/hook';
import {InputPanel} from '../../../input/main';
import {
  SectionProps,
  SectionPropsCondEnums,
  SectionPropsElemEnums,
} from './props';
import {overwriteInputData} from './utils';


type SectionFilterProps =
  SectionProps &
  SectionPropsCondEnums &
  SectionPropsElemEnums;

export const Filter = ({
  inputData,
  setInputData,
  elementEnums,
  conditionEnums,
}: SectionFilterProps) => {
  const {t} = useI18n();

  return (
    <InputPanel
      inputData={inputData}
      setInputData={setInputData}
      inputEntries={[
        {
          type: 'title',
          title: t((t) => t.game.skillAtk.name.filter),
          description: t((t) => t.game.skillAtk.desc.filter),
        },
        {
          type: 'subTitle',
          title: t((t) => t.game.skillAtk.name.filterElement),
          description: t((t) => t.game.skillAtk.desc.filterElement),
        },
        {
          type: 'enumCheckGroup',
          options: elementEnums.elemental,
          getValue: (inputData) => inputData.filter.elemCodes,
          getUpdatedInputData: (newValue) => overwriteInputData(inputData, {filter: {elemCodes: newValue}}),
        },
        {
          type: 'subTitle',
          title: t((t) => t.game.skillAtk.name.filterAffliction),
          description: t((t) => t.game.skillAtk.desc.filterAffliction),
        },
        {
          type: 'enumCheckGroup',
          options: conditionEnums.afflictions,
          getValue: (inputData) => inputData.filter.afflictionCondCode,
          getUpdatedInputData: (newValue) => overwriteInputData(inputData, {filter: {afflictionCondCode: newValue}}),
        },
        {
          type: 'subTitle',
          title: t((t) => t.game.skillAtk.name.filterOther),
          description: t((t) => t.game.skillAtk.desc.filterOther),
        },
        {
          type: 'inputCheckGroup',
          checkboxes: [
            {
              text: t((t) => t.game.skillAtk.name.filterSharedOnly),
              getValue: (inputData) => inputData.filter.sharedOnly,
              getUpdatedInputData: (newValue) => overwriteInputData(inputData, {filter: {sharedOnly: newValue}}),
            },
          ],
        },
      ]}
    />
  );
};

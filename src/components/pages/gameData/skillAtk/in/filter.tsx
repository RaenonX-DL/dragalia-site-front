import React from 'react';

import {UnitType} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {InputPanel} from '../../../../elements/input/panel/main';
import {InputData, SectionProps, SectionPropsCondEnums, SectionPropsElemEnums} from './types';
import {overrideInputData} from './utils/inputData';


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
          title: t((t) => t.game.skillAtk.input.filter.title.name),
          description: t((t) => t.game.skillAtk.input.filter.title.desc),
        },
        {
          type: 'subTitle',
          title: t((t) => t.game.skillAtk.input.filter.element.name),
          description: t((t) => t.game.skillAtk.input.filter.element.desc),
        },
        {
          type: 'enumCheckGroup',
          options: elementEnums.elemental,
          getValue: (inputData: InputData) => inputData.filter.elemCodes,
          getUpdatedInputData: (newValue: Array<number>) => (
            overrideInputData(inputData, {filter: {elemCodes: newValue}})
          ),
        },
        {
          type: 'subTitle',
          title: t((t) => t.game.skillAtk.input.filter.affliction.name),
          description: t((t) => t.game.skillAtk.input.filter.affliction.desc),
        },
        {
          type: 'enumCheckGroup',
          options: conditionEnums.afflictions,
          getValue: (inputData: InputData) => inputData.filter.afflictionCondCode,
          getUpdatedInputData: (newValue: Array<number>) => (
            overrideInputData(inputData, {filter: {afflictionCondCode: newValue}})
          ),
        },
        {
          type: 'subTitle',
          title: t((t) => t.game.skillAtk.input.filter.unitType.name),
          description: t((t) => t.game.skillAtk.input.filter.unitType.desc),
        },
        {
          type: 'inputCheckGroup',
          options: Object.keys(UnitType).filter((item) => !isNaN(+item)).map((item) => {
            const code = +item as UnitType;

            return {text: t((t) => t.enum.unitType[code]), code};
          }),
          getValue: (inputData) => inputData.filter.type,
          getValueOfOption: (option) => option.code,
          getUpdatedInputData: (type: Array<UnitType>) => overrideInputData(inputData, {filter: {type}}),
        },
        {
          type: 'subTitle',
          title: t((t) => t.game.skillAtk.input.filter.other.name),
          description: t((t) => t.game.skillAtk.input.filter.other.desc),
        },
        {
          type: 'individualCheckGroup',
          checkboxes: [
            {
              text: t((t) => t.game.skillAtk.input.filter.only.shared),
              getValue: (inputData) => inputData.filter.sharedOnly,
              getUpdatedInputData: (newValue) => overrideInputData(inputData, {filter: {sharedOnly: newValue}}),
            },
            {
              text: t((t) => t.game.skillAtk.input.filter.only.dispel),
              getValue: (inputData) => inputData.filter.dispelOnly,
              getUpdatedInputData: (newValue) => overrideInputData(inputData, {filter: {dispelOnly: newValue}}),
            },
          ],
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.input.filter.ssCostMax.name),
          description: t((t) => t.game.skillAtk.input.filter.ssCostMax.desc),
          getValue: (inputData) => inputData.filter.ssCostMax,
          getUpdatedInputData: (newValue) => (
            overrideInputData(inputData, {filter: {ssCostMax: newValue}})
          ),
        },
      ]}
    />
  );
};

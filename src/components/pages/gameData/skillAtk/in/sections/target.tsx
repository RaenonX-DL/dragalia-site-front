import React from 'react';

import {ConditionCodes} from '../../../../../../const/gameData';
import {useI18n} from '../../../../../../i18n/hook';
import {getConditionName} from '../../../../../../utils/game/conditionName';
import {CheckOption} from '../../../../../elements/common/check/types';
import {InputPanel} from '../../../../../elements/input/panel/main';
import {InputData, SectionProps, SectionPropsCondEnums} from '../types';
import {overrideInputData} from '../utils/inputData';


type SectionTargetProps = SectionProps & SectionPropsCondEnums;

export const SectionTarget = ({inputData, setInputData, conditionEnums}: SectionTargetProps) => {
  const {t} = useI18n();

  const stateLabels: Array<CheckOption & {code: number}> = [
    ConditionCodes.NONE,
    ConditionCodes.TARGET_STATE_OD,
    ConditionCodes.TARGET_STATE_BK,
  ]
    .map((code) => ({text: getConditionName(code, t), code}));

  return (
    <InputPanel
      inputData={inputData}
      setInputData={setInputData}
      inputEntries={[
        {
          type: 'title',
          title: t((t) => t.game.skillAtk.input.target.title.name),
          description: t((t) => t.game.skillAtk.input.target.title.desc),
        },
        {
          type: 'subTitle',
          title: t((t) => t.game.skillAtk.input.target.element.name),
          description: t((t) => t.game.skillAtk.input.target.element.desc),
        },
        {
          type: 'enumRadioGroup',
          options: conditionEnums.elements,
          getValue: (inputData: InputData) => inputData.target.elemCondCode,
          getUpdatedInputData: (elemCondCode: number) => overrideInputData(inputData, {target: {elemCondCode}}),
          groupName: 'targetElement',
        },
        {
          type: 'subTitle',
          title: t((t) => t.game.skillAtk.input.target.affliction.name),
          description: t((t) => t.game.skillAtk.input.target.affliction.desc),
        },
        {
          type: 'enumCheckGroup',
          options: conditionEnums.afflictions,
          getValue: (inputData) => inputData.target.afflictionCodes,
          getUpdatedInputData: (afflictionCodes) => overrideInputData(inputData, {target: {afflictionCodes}}),
        },
        {
          type: 'subTitle',
          title: t((t) => t.game.skillAtk.input.target.state.title.name),
          description: t((t) => t.game.skillAtk.input.target.state.title.desc),
        },
        {
          type: 'inputRadioGroup',
          options: stateLabels,
          getValue: (inputData) => inputData.target.state,
          getValueOfOption: (option) => option.code,
          getUpdatedInputData: (state: InputData['target']['state']) => (
            overrideInputData(inputData, {target: {state}})
          ),
          groupName: 'targetState',
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.input.target.def.down.name),
          description: t((t) => t.game.skillAtk.input.target.def.down.desc),
          getValue: (inputData) => inputData.target.def.downPct,
          getUpdatedInputData: (downPct) => overrideInputData(inputData, {target: {def: {downPct}}}),
          minValue: 0,
          maxValue: 50,
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.input.target.def.base.name),
          description: t((t) => t.game.skillAtk.input.target.def.base.desc),
          getValue: (inputData) => inputData.target.def.base,
          getUpdatedInputData: (base) => overrideInputData(inputData, {target: {def: {base}}}),
          minValue: 0.0001,
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.input.target.def.bk.name),
          description: t((t) => t.game.skillAtk.input.target.def.bk.desc),
          getValue: (inputData) => inputData.target.def.bkRate,
          getUpdatedInputData: (bkRate) => overrideInputData(inputData, {target: {def: {bkRate}}}),
          minValue: 0.0001,
        },
      ]}
    />
  );
};

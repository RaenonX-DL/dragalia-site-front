import React from 'react';

import {ConditionCodes} from '../../../../../../const/gameData';
import {useI18n} from '../../../../../../i18n/hook';
import {getConditionName} from '../../../../../../utils/game/conditionName';
import {CheckOption} from '../../../../common/check/types';
import {InputPanel} from '../../../../input/main';
import {SectionProps, SectionPropsCondEnums} from '../types';
import {overwriteInputData} from '../utils/inputData';


type SectionTargetProps = SectionProps & SectionPropsCondEnums;

export const SectionTarget = ({
  inputData,
  setInputData,
  conditionEnums,
}: SectionTargetProps) => {
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
          title: t((t) => t.game.skillAtk.name.target),
          description: t((t) => t.game.skillAtk.desc.target),
        },
        {
          type: 'subTitle',
          title: t((t) => t.game.skillAtk.name.targetElement),
          description: t((t) => t.game.skillAtk.desc.targetElement),
        },
        {
          type: 'enumRadioGroup',
          options: conditionEnums.elements,
          getValue: (inputData) => inputData.target.elemCondCode,
          getUpdatedInputData: (newValue) => (
            overwriteInputData(inputData, {target: {elemCondCode: newValue}})
          ),
          groupName: 'targetElement',
        },
        {
          type: 'subTitle',
          title: t((t) => t.game.skillAtk.name.targetAffliction),
          description: t((t) => t.game.skillAtk.desc.targetAffliction),
        },
        {
          type: 'enumCheckGroup',
          options: conditionEnums.afflictions,
          getValue: (inputData) => inputData.target.afflictionCodes,
          getUpdatedInputData: (newValue) => (
            overwriteInputData(inputData, {target: {afflictionCodes: newValue}})
          ),
        },
        {
          type: 'subTitle',
          title: t((t) => t.game.skillAtk.name.targetState.title),
          description: t((t) => t.game.skillAtk.desc.targetState.title),
        },
        {
          type: 'inputRadioGroup',
          options: stateLabels,
          getValue: (inputData) => inputData.target.state,
          getUpdatedInputData: (newValue) => (
            overwriteInputData(inputData, {target: {state: newValue}})
          ),
          getCheckOptionComparer: (option) => option.code,
          groupName: 'targetState',
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.name.targetDefDown),
          description: t((t) => t.game.skillAtk.desc.targetDefDown),
          getValue: (inputData) => inputData.target.def.downPct,
          getUpdatedInputData: (newValue) => (
            overwriteInputData(inputData, {target: {def: {downPct: newValue}}})
          ),
          minValue: 0,
          maxValue: 50,
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.name.targetDef),
          description: t((t) => t.game.skillAtk.desc.targetDef),
          getValue: (inputData) => inputData.target.def.base,
          getUpdatedInputData: (newValue) => (
            overwriteInputData(inputData, {target: {def: {base: newValue}}})
          ),
          minValue: 0.0001,
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.name.targetDefBk),
          description: t((t) => t.game.skillAtk.desc.targetDefBk),
          getValue: (inputData) => inputData.target.def.bkRate,
          getUpdatedInputData: (newValue) => (
            overwriteInputData(inputData, {target: {def: {bkRate: newValue}}})
          ),
          minValue: 0.0001,
        },
      ]}
    />
  );
};

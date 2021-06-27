import React from 'react';

import {ConditionCodes} from '../../../../../../const/gameData';
import {useI18n} from '../../../../../../i18n/hook';
import {getConditionName} from '../../../../../../utils/game/conditionName';
import {EnumCheckboxGroup} from '../../../../common/check/enum/checkbox';
import {EnumRadioGroup} from '../../../../common/check/enum/radio';
import {RadioGroup} from '../../../../common/check/group/radio';
import {CheckOption} from '../../../../common/check/types';
import {NumericInput} from '../../../../common/input/numeric';
import {SectionSubTitle} from '../../../elements/subTitle';
import {SectionTitle} from '../../../elements/title';
import {SectionProps, SectionPropsCondEnums} from '../props';
import {overwriteInputData} from '../utils';


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
    <>
      <SectionTitle
        title={t((t) => t.game.skillAtk.name.target)}
        description={t((t) => t.game.skillAtk.desc.target)}
      />
      <SectionSubTitle
        title={t((t) => t.game.skillAtk.name.targetElement)}
        description={t((t) => t.game.skillAtk.desc.targetElement)}
      />
      <EnumRadioGroup
        options={conditionEnums.elements}
        inputData={inputData}
        setInputData={setInputData}
        getValue={(inputData) => inputData.target.elemCondCode}
        getUpdatedInputData={(newValue) => overwriteInputData(inputData, {target: {elemCondCode: newValue}})}
        groupName="targetElement"
      />
      <SectionSubTitle
        title={t((t) => t.game.skillAtk.name.targetAffliction)}
        description={t((t) => t.game.skillAtk.desc.targetAffliction)}
      />
      <EnumCheckboxGroup
        options={conditionEnums.afflictions}
        inputData={inputData}
        setInputData={setInputData}
        getValue={(inputData) => inputData.target.afflictionCodes}
        getUpdatedInputData={(newValue) => overwriteInputData(inputData, {target: {afflictionCodes: newValue}})}
      />
      <SectionSubTitle
        title={t((t) => t.game.skillAtk.name.targetState.title)}
        description={t((t) => t.game.skillAtk.desc.targetState.title)}
      />
      <div className="text-center mb-3">
        <RadioGroup
          options={stateLabels}
          inputData={inputData}
          setInputData={setInputData}
          getValue={(inputData) => inputData.target.state}
          getUpdatedInputData={(newValue) => overwriteInputData(inputData, {target: {state: newValue}})}
          getCheckOptionComparer={(option) => option.code}
          groupName="targetState"
        />
      </div>
      <NumericInput
        title={t((t) => t.game.skillAtk.name.targetDefDown)}
        description={t((t) => t.game.skillAtk.desc.targetDefDown)}
        inputData={inputData}
        setInputData={setInputData}
        getValue={(inputData) => inputData.target.def.downPct}
        getUpdatedInputData={(newValue) => overwriteInputData(inputData, {target: {def: {downPct: newValue}}})}
        minValue={0}
        maxValue={50}
      />
      <NumericInput
        title={t((t) => t.game.skillAtk.name.targetDef)}
        description={t((t) => t.game.skillAtk.desc.targetDef)}
        inputData={inputData}
        setInputData={setInputData}
        getValue={(inputData) => inputData.target.def.base}
        getUpdatedInputData={(newValue) => overwriteInputData(inputData, {target: {def: {base: newValue}}})}
        minValue={0.0001}
      />
      <NumericInput
        title={t((t) => t.game.skillAtk.name.targetDefBk)}
        description={t((t) => t.game.skillAtk.desc.targetDefBk)}
        inputData={inputData}
        setInputData={setInputData}
        getValue={(inputData) => inputData.target.def.bkRate}
        getUpdatedInputData={(newValue) => overwriteInputData(inputData, {target: {def: {bkRate: newValue}}})}
        minValue={0.0001}
      />
    </>
  );
};

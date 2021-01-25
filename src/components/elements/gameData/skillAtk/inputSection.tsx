import React, {ChangeEventHandler} from 'react';
import {Form} from 'react-bootstrap';
import {ConditionCodes} from '../../../../constants/gameData';
import {CategorizedConditionEnums, ElementEnums} from '../../../../utils/services/resources/types';

import {
  EnumResourceChecks,
  InlineChecks,
  NumericalInput,
  RadioChecks,
  SectionSubTitle,
  SectionTitle,
} from '../base/inputBase';

export type InputData = {
  atkInGame: number,
  atkConditionalPct: number,
  atkBuffPct: number,
  buffCount: number,
  buffZoneSelf: number,
  buffZoneAlly: number,
  exBlade: boolean,
  exWand: boolean,
  criticalRatePct: number,
  criticalDamagePct: number,
  criticalInspired: boolean,
  skillBuffPct: number,
  skillPassivePct: number,
  skillEnergized: boolean,
  punishersBkPct: number,
  punishersOtherPct: number,
  otherElemBonusPct: number,
  otherCurrentHpPct: number,
  targetElemCondCode: number,
  targetAfflictionCodes: Array<number>,
  targetDefBase: number,
  targetDefDownPct: number,
  targetDefBkRate: number,
  targetStateCode: ConditionCodes.NONE | ConditionCodes.TARGET_STATE_BK | ConditionCodes.TARGET_STATE_OD,
  filterElementCode: Array<number>,
  filterAfflictionCondCode: Array<number>,
  filterSharedOnly: boolean,
}

type SectionProps = {
  inputData: InputData,
}

type SectionPropsWithCheck = SectionProps & {
  fnUpdateInputDataCheck: ChangeEventHandler<HTMLInputElement>,
}

type SectionPropsWithCheckMulti = SectionProps & {
  fnUpdateInputDataCheckMulti: (code: number) => ChangeEventHandler<HTMLInputElement>,
}

type SectionPropsWithRadio = SectionProps & {
  fnUpdateInputDataRadio: (code: number) => ChangeEventHandler<HTMLInputElement>,
}

type SectionPropsWithNum = SectionProps & {
  fnUpdateInputDataValue: ChangeEventHandler<HTMLInputElement>
}

type SectionPropsWithCondEnums = SectionProps & {
  conditionEnums: CategorizedConditionEnums
};

type SectionPropsWithElemEnums = SectionProps & {
  elementEnums: ElementEnums
};

export const SectionAtk = ({inputData, fnUpdateInputDataValue}: SectionPropsWithNum) => {
  return (
    (
      <>
        <SectionTitle
          titleLabel={'game.skill_atk.name.atk'}
          descriptionLabel={'game.skill_atk.desc.atk'}/>
        <NumericalInput
          titleLabel={'game.skill_atk.name.atk_in_game'} descriptionLabel={'game.skill_atk.desc.atk_in_game'}
          defaultValue={inputData.atkInGame} name="atkInGame" onChange={fnUpdateInputDataValue}/>
        <NumericalInput
          titleLabel={'game.skill_atk.name.atk_conditional'} descriptionLabel={'game.skill_atk.desc.atk_conditional'}
          defaultValue={inputData.atkConditionalPct} name="atkConditionalPct" onChange={fnUpdateInputDataValue}/>
        <NumericalInput
          titleLabel={'game.skill_atk.name.atk_buff'} descriptionLabel={'game.skill_atk.desc.atk_buff'}
          maxValue={200}
          defaultValue={inputData.atkBuffPct} name="atkBuffPct" onChange={fnUpdateInputDataValue}/>
      </>
    )
  );
};

export const SectionBuff = ({inputData, fnUpdateInputDataValue}: SectionPropsWithNum) => (
  <>
    <SectionTitle
      titleLabel={'game.skill_atk.name.buff_boost'}
      descriptionLabel={'game.skill_atk.desc.buff_boost'}/>
    <NumericalInput
      titleLabel={'game.skill_atk.name.buff_count'} descriptionLabel={'game.skill_atk.desc.buff_count'}
      defaultValue={inputData.buffCount} name="buffCount" onChange={fnUpdateInputDataValue}/>
    <NumericalInput
      titleLabel={'game.skill_atk.name.buff_zone_self'} descriptionLabel={'game.skill_atk.desc.buff_zone_self'}
      defaultValue={inputData.buffZoneSelf} name="buffZoneSelf" onChange={fnUpdateInputDataValue}/>
    <NumericalInput
      titleLabel={'game.skill_atk.name.buff_zone_ally'} descriptionLabel={'game.skill_atk.desc.buff_zone_ally'}
      defaultValue={inputData.buffZoneAlly} name="buffZoneAlly" onChange={fnUpdateInputDataValue}/>
  </>
);

export const SectionEx = ({inputData, fnUpdateInputDataCheck}: SectionPropsWithCheck) => (
  <>
    <SectionTitle
      titleLabel={'game.skill_atk.name.ex'}
      descriptionLabel={'game.skill_atk.desc.ex'}/>
    <div className="text-center">
      <InlineChecks
        titleLabel={'game.skill_atk.name.ex_blade'} groupName="exBlade" checked={inputData.exBlade}
        onChange={fnUpdateInputDataCheck}/>
      <InlineChecks
        titleLabel={'game.skill_atk.name.ex_wand'} groupName="exWand" checked={inputData.exWand}
        onChange={fnUpdateInputDataCheck}/>
    </div>
  </>
);

export const SectionCrt = (props: SectionPropsWithNum & SectionPropsWithCheck) => {
  const {inputData, fnUpdateInputDataValue, fnUpdateInputDataCheck} = props;

  return (
    <>
      <SectionTitle
        titleLabel={'game.skill_atk.name.crt'}
        descriptionLabel={'game.skill_atk.desc.crt'}
      />
      <NumericalInput
        titleLabel={'game.skill_atk.name.crt_rate'} descriptionLabel={'game.skill_atk.desc.crt_rate'}
        maxValue={100}
        defaultValue={inputData.criticalRatePct} name="criticalRatePct" onChange={fnUpdateInputDataValue}/>
      <NumericalInput
        titleLabel={'game.skill_atk.name.crt_damage'} descriptionLabel={'game.skill_atk.desc.crt_damage'}
        maxValue={400}
        defaultValue={inputData.criticalDamagePct} name="criticalDamagePct" onChange={fnUpdateInputDataValue}/>
      <div className="text-center">
        <InlineChecks
          titleLabel={'game.skill_atk.name.crt_inspired'} groupName="criticalInspired"
          checked={inputData.criticalInspired} onChange={fnUpdateInputDataCheck}/>
      </div>
    </>
  );
};

export const SectionSkill = (props: SectionPropsWithNum & SectionPropsWithCheck) => {
  const {inputData, fnUpdateInputDataValue, fnUpdateInputDataCheck} = props;

  return (
    <>
      <SectionTitle
        titleLabel={'game.skill_atk.name.skill'}
        descriptionLabel={'game.skill_atk.desc.skill'}/>
      <NumericalInput
        titleLabel={'game.skill_atk.name.skill_passive'} descriptionLabel={'game.skill_atk.desc.skill_passive'}
        defaultValue={inputData.skillPassivePct} name="skillPassivePct" onChange={fnUpdateInputDataValue}/>
      <NumericalInput
        titleLabel={'game.skill_atk.name.skill_buff'} descriptionLabel={'game.skill_atk.desc.skill_buff'}
        maxValue={200}
        defaultValue={inputData.skillBuffPct} name="skillBuffPct" onChange={fnUpdateInputDataValue}/>
      <div className="text-center">
        <InlineChecks
          titleLabel={'game.skill_atk.name.skill_energized'} onChange={fnUpdateInputDataCheck}
          groupName="skillEnergized" checked={inputData.skillEnergized}/>
      </div>
    </>
  );
};

export const SectionPunisher = ({inputData, fnUpdateInputDataValue}: SectionPropsWithNum) => (
  <>
    <SectionTitle
      titleLabel={'game.skill_atk.name.punisher'}
      descriptionLabel={'game.skill_atk.desc.punisher'}/>
    <NumericalInput
      titleLabel={'game.skill_atk.name.punisher_bk'} descriptionLabel={'game.skill_atk.desc.punisher_bk'}
      defaultValue={inputData.punishersBkPct} name="punishersBkPct" onChange={fnUpdateInputDataValue}/>
    <NumericalInput
      titleLabel={'game.skill_atk.name.punisher_others'} descriptionLabel={'game.skill_atk.desc.punisher_others'}
      defaultValue={inputData.punishersOtherPct} name="punishersOtherPct" onChange={fnUpdateInputDataValue}/>
  </>
);

export const SectionOther = ({inputData, fnUpdateInputDataValue}: SectionPropsWithNum) => (
  <>
    <SectionTitle
      titleLabel={'game.skill_atk.name.other'}
      descriptionLabel={'game.skill_atk.desc.other'}/>
    <NumericalInput
      titleLabel={'game.skill_atk.name.other_element_bonus'}
      descriptionLabel={'game.skill_atk.desc.other_element_bonus'}
      defaultValue={inputData.otherElemBonusPct} name="otherElemBonusPct" onChange={fnUpdateInputDataValue}/>
    <NumericalInput
      titleLabel={'game.skill_atk.name.other_hp'} descriptionLabel={'game.skill_atk.desc.other_hp'}
      defaultValue={inputData.otherCurrentHpPct} name="otherCurrentHpPct" onChange={fnUpdateInputDataValue}/>
  </>
);

type SectionTargetProps =
  SectionPropsWithNum &
  SectionPropsWithRadio &
  SectionPropsWithCheckMulti &
  SectionPropsWithCondEnums;

export const SectionTarget = (props: SectionTargetProps) => {
  const {
    inputData,
    fnUpdateInputDataCheckMulti,
    fnUpdateInputDataValue,
    fnUpdateInputDataRadio,
    conditionEnums,
  } = props;

  const stateLabels = [
    {
      label: 'game.skill_atk.name.target_state.none',
      code: ConditionCodes.NONE,
    },
    {
      label: 'game.skill_atk.name.target_state.od',
      code: ConditionCodes.TARGET_STATE_OD,
    },
    {
      label: 'game.skill_atk.name.target_state.bk',
      code: ConditionCodes.TARGET_STATE_BK,
    },
  ];

  return (
    <>
      <SectionTitle
        titleLabel={'game.skill_atk.name.target'}
        descriptionLabel={'game.skill_atk.desc.target'}/>
      <SectionSubTitle
        titleLabel={'game.skill_atk.name.target_element'}
        descriptionLabel={'game.skill_atk.desc.target_element'}/>
      <EnumResourceChecks
        enumEntries={conditionEnums.elements} type="radio" groupName="targetElemCondCode"
        onChange={fnUpdateInputDataRadio} isChecked={(code: number) => code === inputData.targetElemCondCode}/>
      <SectionSubTitle
        titleLabel={'game.skill_atk.name.target_affliction'}
        descriptionLabel={'game.skill_atk.desc.target_affliction'}/>
      <EnumResourceChecks
        enumEntries={conditionEnums.afflictions} type="checkbox" groupName="targetAfflictionCodes"
        onChange={fnUpdateInputDataCheckMulti}
        isChecked={(code: number) => inputData.targetAfflictionCodes.includes(code)}/>
      <SectionSubTitle
        titleLabel={'game.skill_atk.name.target_state.title'}
        descriptionLabel={'game.skill_atk.desc.target_state.title'}/>
      <div className="text-center mb-3">
        <RadioChecks
          checkedCode={inputData.targetStateCode} labels={stateLabels}
          groupName="targetStateCode" onChangeWrap={fnUpdateInputDataRadio}/>
      </div>
      <NumericalInput
        titleLabel={'game.skill_atk.name.target_def_down'} descriptionLabel={'game.skill_atk.desc.target_def_down'}
        maxValue={50}
        defaultValue={inputData.targetDefDownPct} name="targetDefDownPct" onChange={fnUpdateInputDataValue}/>
      <NumericalInput
        titleLabel={'game.skill_atk.name.target_def'} descriptionLabel={'game.skill_atk.desc.target_def'}
        defaultValue={inputData.targetDefBase} name="targetDefBase" onChange={fnUpdateInputDataValue}/>
      <NumericalInput
        titleLabel={'game.skill_atk.name.target_def_bk'} descriptionLabel={'game.skill_atk.desc.target_def_bk'}
        defaultValue={inputData.targetDefBkRate} name="targetDefBkRate" onChange={fnUpdateInputDataValue}/>
    </>
  );
};

type SectionFilterProps =
  SectionPropsWithCheck &
  SectionPropsWithCheckMulti &
  SectionPropsWithCondEnums &
  SectionPropsWithElemEnums;

export const SectionFilter = (props: SectionFilterProps) => {
  const {
    inputData,
    fnUpdateInputDataCheck,
    fnUpdateInputDataCheckMulti,
    conditionEnums,
    elementEnums,
  } = props;

  return (
    <>
      <SectionTitle
        titleLabel={'game.skill_atk.name.filter'}
        descriptionLabel={'game.skill_atk.desc.filter'}/>
      <SectionSubTitle
        titleLabel={'game.skill_atk.name.filter_element'}
        descriptionLabel={'game.skill_atk.desc.filter_element'}/>
      <EnumResourceChecks
        enumEntries={elementEnums.elemental}
        type="checkbox" groupName="filterElementCode" onChange={fnUpdateInputDataCheckMulti}
        isChecked={(code: number) => inputData.filterElementCode.includes(code)}/>
      <SectionSubTitle
        titleLabel={'game.skill_atk.name.filter_affliction'}
        descriptionLabel={'game.skill_atk.desc.filter_affliction'}/>
      <EnumResourceChecks
        enumEntries={conditionEnums.afflictions}
        type="checkbox" groupName="filterAfflictionCondCode" onChange={fnUpdateInputDataCheckMulti}
        isChecked={(code: number) => inputData.filterAfflictionCondCode.includes(code)}/>
      <SectionSubTitle
        titleLabel={'game.skill_atk.name.filter_other'}
        descriptionLabel={'game.skill_atk.desc.filter_other'}/>
      <Form.Group className="mb-3 text-center">
        <InlineChecks
          titleLabel={'game.skill_atk.name.filter_shared_only'} onChange={fnUpdateInputDataCheck}
          groupName="filterSharedOnly" checked={inputData.filterSharedOnly}/>
      </Form.Group>
    </>
  );
};

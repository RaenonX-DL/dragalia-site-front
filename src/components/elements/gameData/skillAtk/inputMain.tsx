import React, {ChangeEvent, MouseEvent} from 'react';
import {Button} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {ConditionCodes} from '../../../../constants/gameData';
import {ConditionEnums, ResourcePaths} from '../../../../utils/services/resources';

import {
  InputData,
  SectionAtk,
  SectionBuff,
  SectionCrt,
  SectionEx,
  SectionOther,
  SectionPunisher,
  SectionSkill,
  SectionTarget,
} from './inputSection';


export type InputEnums = {
  fetched: boolean,
  conditionEnums: ConditionEnums
}


type InputProps = {
  onSearchRequested: (inputData: InputData) => (event: MouseEvent<HTMLButtonElement>) => void,
}


export const AttackingSkillInput = ({onSearchRequested}: InputProps) => {
  const {t} = useTranslation();

  const [inputEnums, setInputEnums] = React.useState<InputEnums>({
    fetched: false,
    conditionEnums: {
      afflictions: [],
      elements: [],
    },
  });

  const [inputData, setInputData] = React.useState<InputData>({
    atkInGame: 5000,
    atkConditionalPct: 20,
    atkBuffPct: 0,
    buffCount: 0,
    buffZoneSelf: 0,
    buffZoneAlly: 0,
    exBlade: false,
    exWand: false,
    criticalRatePct: 4,
    criticalDamagePct: 0,
    criticalInspired: false,
    skillBuffPct: 0,
    skillPassivePct: 40,
    skillEnergized: false,
    punishersBkPct: 0,
    punishersOtherPct: 20,
    otherElemBonusPct: 0,
    targetElemCondCode: ConditionCodes.TARGET_ELEM_EFFECTIVE,
    targetAfflictionCodes: [],
    targetDefBase: 10,
    targetDefDownPct: 0,
    targetDefBkRate: 0.6,
    targetStateCode: ConditionCodes.NONE,
  });

  const updateInputDataValue = (e: ChangeEvent<HTMLInputElement>) => setInputData({
    ...inputData,
    [e.target.name]: Math.min(e.target.max ? parseFloat(e.target.max) : Infinity, parseFloat(e.target.value)),
  });

  const updateInputDataCheck = (e: ChangeEvent<HTMLInputElement>) => setInputData({
    ...inputData,
    [e.target.name]: e.target.checked,
  });

  const updateInputDataCheckEnumMulti = (code: number) => (e: ChangeEvent<HTMLInputElement>) => setInputData({
    ...inputData,
    [e.target.name]: (
      e.target.checked ?
        inputData[e.target.name].concat([code]) :
        inputData[e.target.name].filter((dataCode) => dataCode !== code)
    ),
  });

  const updateInputDataRadio = (code: number) => (e: ChangeEvent<HTMLInputElement>) => setInputData({
    ...inputData,
    [e.target.name]: code,
  });

  // region Fetch input enums
  if (!inputEnums.fetched) {
    fetch(ResourcePaths.ENUMS_CONDITIONS)
      .then((response) => response.json())
      .then((data) => {
        setInputEnums({
          ...inputEnums,
          fetched: true,
          conditionEnums: data,
        });
      });
  }
  // endregion

  return (
    <>
      <SectionAtk
        inputData={inputData}
        fnUpdateInputDataValue={updateInputDataValue}/>
      <hr/>
      <SectionBuff
        inputData={inputData}
        fnUpdateInputDataValue={updateInputDataValue}/>
      <hr/>
      <SectionEx
        inputData={inputData}
        fnUpdateInputDataCheck={updateInputDataCheck}/>
      <hr/>
      <SectionCrt
        inputData={inputData}
        fnUpdateInputDataValue={updateInputDataValue}
        fnUpdateInputDataCheck={updateInputDataCheck}/>
      <hr/>
      <SectionSkill
        inputData={inputData}
        fnUpdateInputDataValue={updateInputDataValue}
        fnUpdateInputDataCheck={updateInputDataCheck}/>
      <hr/>
      <SectionPunisher
        inputData={inputData}
        fnUpdateInputDataValue={updateInputDataValue}/>
      <hr/>
      <SectionOther
        inputData={inputData}
        fnUpdateInputDataValue={updateInputDataValue}/>
      <hr/>
      <SectionTarget
        inputData={inputData} conditionEnums={inputEnums.conditionEnums}
        fnUpdateInputDataValue={updateInputDataValue}
        fnUpdateInputDataRadio={updateInputDataRadio}
        fnUpdateInputDataCheckMulti={updateInputDataCheckEnumMulti}/>
      <hr/>
      <div className="text-right">
        <Button variant="outline-info" onClick={onSearchRequested(inputData)}>
          {t('game.skill_atk.search')}
        </Button>
      </div>
    </>
  );
};

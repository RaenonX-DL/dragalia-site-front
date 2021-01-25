import React, {ChangeEvent, MouseEvent} from 'react';
import {Button, Collapse} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {ConditionCodes} from '../../../../constants/gameData';
import {scrollToTop} from '../../../../utils/misc';
import {CategorizedConditionEnums, ElementEnums, ResourceLoader} from '../../../../utils/services/resources';

import {
  InputData,
  SectionAtk,
  SectionBuff,
  SectionCrt,
  SectionEx,
  SectionFilter,
  SectionOther,
  SectionPunisher,
  SectionSkill,
  SectionTarget,
} from './inputSection';


type InputSummaryProps = {
  inputData: InputData
}


const InputSummary = ({inputData}: InputSummaryProps) => {
  const {t} = useTranslation();

  const detailClass = 'text-info';

  return (
    <>
      <h5>{
        t(
          'game.skill_atk.summary.atk',
          {
            atkVal:
              (
                inputData.atkInGame * // In-game ATK
                (1 + inputData.atkConditionalPct / 100) * // Condition ATK boosts
                (1 + inputData.atkBuffPct / 100)
              ).toFixed(2),
          },
        )
      }</h5>
      <p className={detailClass}>
        {
          t(
            'game.skill_atk.summary.atk_data',
            {
              atkInGame: inputData.atkInGame,
              atkConditionalPct: inputData.atkConditionalPct.toFixed(0),
              atkBuffPct: inputData.atkBuffPct.toFixed(0),
            },
          )
        }
      </p>
      <h5>{t('game.skill_atk.summary.buff')}</h5>
      <p className={detailClass}>
        {
          t(
            'game.skill_atk.summary.buff_data',
            {
              buffCount: inputData.buffCount,
              buffZoneSelf: inputData.buffZoneSelf,
              buffZoneAlly: inputData.buffZoneAlly,
            },
          )
        }
      </p>
      <h5>{t('game.skill_atk.summary.ex')}</h5>
      <p className={detailClass}>
        {
          [
            [inputData.exBlade, 'game.skill_atk.summary.ex_blade'],
            [inputData.exWand, 'game.skill_atk.summary.ex_wand'],
          ]
            .filter((entry) => entry[0])
            .map((entry) => t(entry[1] as string))
            .join(' / ') ||
          t('game.skill_atk.summary.ex_none')
        }
      </p>
      <h5>{
        t(
          'game.skill_atk.summary.crt',
          {
            crtVal: (
              1 +
              (inputData.criticalInspired ? 1 : inputData.criticalRatePct / 100) * // Critical Rate and Inspired
              (inputData.criticalDamagePct / 100 + 0.7) // Critical damage
            ).toFixed(2),
          },
        )
      }</h5>
      <p className={detailClass}>
        {
          [
            inputData.criticalInspired ?
              t('game.skill_atk.summary.crt_inspired') :
              t('game.skill_atk.summary.crt_rate', {crtRate: inputData.criticalRatePct.toFixed(1)}),
            t('game.skill_atk.summary.crt_damage', {crtDamage: inputData.criticalDamagePct}),
          ]
            .join(' / ')
        }
      </p>
      <h5>{
        t(
          'game.skill_atk.summary.skill',
          {
            skillVal:
              (
                (1 + (inputData.skillPassivePct + (inputData.skillEnergized ? 50 : 0)) / 100) * // Passives & Energized
                (1 + (inputData.exWand ? 0.15 : 0)) * // Wand EX
                (1 + inputData.skillBuffPct / 100) // Skill Damage Buffs
              ).toFixed(2),
          },
        )
      }</h5>
      <p className={detailClass}>
        {
          [
            t('game.skill_atk.summary.skill_passive', {skillPassivePct: inputData.skillPassivePct}),
            t('game.skill_atk.summary.skill_buff', {skillBuffPct: inputData.skillBuffPct}),
            inputData.skillEnergized ? t('game.skill_atk.summary.skill_energized') : '',
          ]
            .filter((str) => str.length > 0)
            .join(' / ')
        }
      </p>
      <h5>{
        t(
          'game.skill_atk.summary.punisher',
          {
            punisherVal:
              (
                (1 + inputData.punishersBkPct / 100) *
                (1 + inputData.punishersOtherPct / 100)
              ).toFixed(2),
          },
        )
      }</h5>
      <p className={detailClass}>
        {
          t(
            'game.skill_atk.summary.punisher_data',
            {
              punishersBkPct: inputData.punishersBkPct,
              punishersOtherPct: inputData.punishersOtherPct,
            },
          )
        }
      </p>
      <h5>{t('game.skill_atk.summary.other')}</h5>
      <p className={detailClass}>
        {
          t(
            'game.skill_atk.summary.other_data',
            {
              otherElemBonusPct: inputData.otherElemBonusPct,
              otherCurrentHpPct: inputData.otherCurrentHpPct,
            },
          )
        }
      </p>
    </>
  );
};


type InputComponentProps = {
  inputData: InputData,
  setInputData: React.Dispatch<React.SetStateAction<InputData>>,
  collapsed: boolean
}


const InputComponent = ({collapsed, inputData, setInputData}: InputComponentProps) => {
  // region Update functions
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
  // endregion

  // region Get input enums (conditions)
  const [inputConditionEnums, setInputConditionEnums] = React.useState<InputConditionEnums>({
    fetched: false,
    conditionEnums: {
      afflictions: [],
      elements: [],
    },
  });

  if (!inputConditionEnums.fetched) {
    ResourceLoader.getEnumCategorizedConditions((data) => {
      setInputConditionEnums({
        ...inputConditionEnums,
        fetched: true,
        conditionEnums: data,
      });
    })
      .catch((e) => {
        console.warn('Failed to fetch the condition enum resource.', e);
      });
  }
  // endregion

  // region Get input enums (elements)
  const [inputElementEnums, setInputElementEnums] = React.useState<InputElementEnums>({
    fetched: false,
    elementEnums: {
      elemental: [],
    },
  });

  if (!inputElementEnums.fetched) {
    ResourceLoader.getEnumElements((data) => {
      setInputElementEnums({
        ...inputElementEnums,
        fetched: true,
        elementEnums: data,
      });
    })
      .catch((e) => {
        console.warn('Failed to fetch the element enum resource.', e);
      });
  }
  // endregion

  return (
    <>
      <Collapse in={!collapsed}>
        <div>
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
        </div>
      </Collapse>
      <SectionTarget
        inputData={inputData} conditionEnums={inputConditionEnums.conditionEnums}
        fnUpdateInputDataValue={updateInputDataValue}
        fnUpdateInputDataRadio={updateInputDataRadio}
        fnUpdateInputDataCheckMulti={updateInputDataCheckEnumMulti}/>
      <hr/>
      <SectionFilter
        inputData={inputData} conditionEnums={inputConditionEnums.conditionEnums}
        elementEnums={inputElementEnums.elementEnums}
        fnUpdateInputDataCheckMulti={updateInputDataCheckEnumMulti}/>
    </>
  );
};


type InputConditionEnums = {
  fetched: boolean,
  conditionEnums: CategorizedConditionEnums,
}


type InputElementEnums = {
  fetched: boolean,
  elementEnums: ElementEnums,
}


type InputProps = {
  onSearchRequested: (inputData: InputData) => (event: MouseEvent<HTMLButtonElement>) => void,
}


export const AttackingSkillInput = ({onSearchRequested}: InputProps) => {
  const {t} = useTranslation();

  const [collapsed, setCollapsed] = React.useState(false);

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
    otherCurrentHpPct: 100,
    targetElemCondCode: ConditionCodes.TARGET_ELEM_EFFECTIVE,
    targetAfflictionCodes: [],
    targetDefBase: 10,
    targetDefDownPct: 0,
    targetDefBkRate: 0.6,
    targetStateCode: ConditionCodes.NONE,
    filterElementCode: [],
    filterAfflictionCondCode: [],
  });

  const onCollapseClicked = () => {
    setCollapsed(!collapsed);

    scrollToTop();
  };

  return (
    <>
      <Collapse in={collapsed}>
        <div>
          <InputSummary inputData={inputData}/>
          <hr/>
        </div>
      </Collapse>
      <InputComponent collapsed={collapsed} inputData={inputData} setInputData={setInputData}/>
      <hr/>
      <div className="text-right">
        <Button variant="outline-primary" onClick={onCollapseClicked} className="mr-2">
          {t('game.skill_atk.collapse')}
        </Button>
        <Button variant="outline-info" onClick={onSearchRequested(inputData)}>
          {t('game.skill_atk.search')}
        </Button>
      </div>
    </>
  );
};

import React from 'react';

import {ConditionCodes} from '../../../../../const/gameData';
import {useI18n} from '../../../../../i18n/hook';
import {EnumChecksBox} from '../../elements/enumChecksBox';
import {EnumChecksRadio} from '../../elements/enumChecksRadio';
import {NumericInput} from '../../elements/numInput';
import {RadioChecks} from '../../elements/radio';
import {SectionSubTitle} from '../../elements/subTitle';
import {SectionTitle} from '../../elements/title';
import {SectionProps, SectionPropsCondEnums} from './props';

type SectionTargetProps = SectionProps & SectionPropsCondEnums;

export const SectionTarget = ({
  inputData,
  setInputData,
  conditionEnums,
}: SectionTargetProps) => {
  const {t} = useI18n();

  const stateLabels = [
    {
      text: t((t) => t.game.skillAtk.name.targetState.none),
      code: ConditionCodes.NONE,
    },
    {
      text: t((t) => t.game.skillAtk.name.targetState.od),
      code: ConditionCodes.TARGET_STATE_OD,
    },
    {
      text: t((t) => t.game.skillAtk.name.targetState.bk),
      code: ConditionCodes.TARGET_STATE_BK,
    },
  ];

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
      <EnumChecksRadio
        options={conditionEnums.elements}
        inputKey="targetElemCondCode"
        inputData={inputData}
        setInputData={setInputData}
      />
      <SectionSubTitle
        title={t((t) => t.game.skillAtk.name.targetAffliction)}
        description={t((t) => t.game.skillAtk.desc.targetAffliction)}
      />
      <EnumChecksBox
        options={conditionEnums.afflictions}
        inputKey="targetAfflictionCodes"
        inputData={inputData}
        setInputData={setInputData}
      />
      <SectionSubTitle
        title={t((t) => t.game.skillAtk.name.targetState.title)}
        description={t((t) => t.game.skillAtk.desc.targetState.title)}
      />
      <div className="text-center mb-3">
        <RadioChecks
          options={stateLabels}
          inputKey="targetStateCode"
          inputData={inputData}
          setInputData={setInputData}
        />
      </div>
      <NumericInput
        title={t((t) => t.game.skillAtk.name.targetDefDown)}
        description={t((t) => t.game.skillAtk.desc.targetDefDown)}
        inputData={inputData}
        inputKey="targetDefDownPct"
        setInputData={setInputData}
        minValue={0}
        maxValue={50}
      />
      <NumericInput
        title={t((t) => t.game.skillAtk.name.targetDef)}
        description={t((t) => t.game.skillAtk.desc.targetDef)}
        inputData={inputData}
        inputKey="targetDefBase"
        setInputData={setInputData}
        minValue={0.0001}
      />
      <NumericInput
        title={t((t) => t.game.skillAtk.name.targetDefBk)}
        description={t((t) => t.game.skillAtk.desc.targetDefBk)}
        inputData={inputData}
        inputKey="targetDefBkRate"
        setInputData={setInputData}
        minValue={0.0001}
      />
    </>
  );
};

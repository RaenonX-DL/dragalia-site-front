import React from 'react';

import {ConditionCodes} from '../../../../../const/gameData';
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
        descriptionLabel={'game.skill_atk.desc.target'}
      />
      <SectionSubTitle
        titleLabel={'game.skill_atk.name.target_element'}
        descriptionLabel={'game.skill_atk.desc.target_element'}
      />
      <EnumChecksRadio
        options={conditionEnums.elements}
        inputKey="targetElemCondCode"
        inputData={inputData}
        setInputData={setInputData}
      />
      <SectionSubTitle
        titleLabel={'game.skill_atk.name.target_affliction'}
        descriptionLabel={'game.skill_atk.desc.target_affliction'}
      />
      <EnumChecksBox
        options={conditionEnums.afflictions}
        inputKey="targetAfflictionCodes"
        inputData={inputData}
        setInputData={setInputData}
      />
      <SectionSubTitle
        titleLabel={'game.skill_atk.name.target_state.title'}
        descriptionLabel={'game.skill_atk.desc.target_state.title'}
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
        titleLabel={'game.skill_atk.name.target_def_down'}
        descriptionLabel={'game.skill_atk.desc.target_def_down'}
        inputData={inputData}
        inputKey="targetDefDownPct"
        setInputData={setInputData}
        minValue={0}
        maxValue={50}
      />
      <NumericInput
        titleLabel={'game.skill_atk.name.target_def'}
        descriptionLabel={'game.skill_atk.desc.target_def'}
        inputData={inputData}
        inputKey="targetDefBase"
        setInputData={setInputData}
        minValue={0.0001}
      />
      <NumericInput
        titleLabel={'game.skill_atk.name.target_def_bk'}
        descriptionLabel={'game.skill_atk.desc.target_def_bk'}
        inputData={inputData}
        inputKey="targetDefBkRate"
        setInputData={setInputData}
        minValue={0.0001}
      />
    </>
  );
};

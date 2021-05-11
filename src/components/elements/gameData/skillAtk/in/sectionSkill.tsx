import React from 'react';

import {InlineCheck} from '../../elements/inlineCheck';
import {NumericInput} from '../../elements/numInput';
import {SectionTitle} from '../../elements/title';
import {SectionProps} from './props';

export const SectionSkill = ({inputData, setInputData}: SectionProps) => {
  return (
    <>
      <SectionTitle
        titleLabel={'game.skill_atk.name.skill'}
        descriptionLabel={'game.skill_atk.desc.skill'}
      />
      <NumericInput
        titleLabel={'game.skill_atk.name.skill_passive'}
        descriptionLabel={'game.skill_atk.desc.skill_passive'}
        inputData={inputData}
        inputKey="skillPassivePct"
        setInputData={setInputData}
      />
      <NumericInput
        titleLabel={'game.skill_atk.name.skill_buff'}
        descriptionLabel={'game.skill_atk.desc.skill_buff'}
        inputData={inputData}
        inputKey="skillBuffPct"
        setInputData={setInputData}
        maxValue={200}
      />
      <div className="text-center">
        <InlineCheck
          titleLabel={'game.skill_atk.name.skill_energized'}
          inputData={inputData}
          inputKey="skillEnergized"
          setInputData={setInputData}
        />
      </div>
    </>
  );
};

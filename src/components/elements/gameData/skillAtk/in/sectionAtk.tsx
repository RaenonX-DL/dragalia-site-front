import React from 'react';

import {NumericInput} from '../../elements/numInput';
import {SectionTitle} from '../../elements/title';
import {SectionProps} from './props';

export const SectionAtk = ({inputData, setInputData}: SectionProps) => (
  <>
    <SectionTitle
      titleLabel={'game.skill_atk.name.atk'}
      descriptionLabel={'game.skill_atk.desc.atk'}/>
    <NumericInput
      titleLabel={'game.skill_atk.name.atk_in_game'}
      descriptionLabel={'game.skill_atk.desc.atk_in_game'}
      inputData={inputData}
      inputKey="atkInGame"
      setInputData={setInputData}
    />
    <NumericInput
      titleLabel={'game.skill_atk.name.atk_conditional'}
      descriptionLabel={'game.skill_atk.desc.atk_conditional'}
      inputData={inputData}
      inputKey="atkConditionalPct"
      setInputData={setInputData}
    />
    <NumericInput
      titleLabel={'game.skill_atk.name.atk_buff'}
      descriptionLabel={'game.skill_atk.desc.atk_buff'}
      inputData={inputData}
      inputKey="atkBuffPct"
      setInputData={setInputData}
      maxValue={200}
    />
  </>
);

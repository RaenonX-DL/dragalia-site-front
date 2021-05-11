import React from 'react';

import {NumericInput} from '../../elements/numInput';
import {SectionTitle} from '../../elements/title';
import {SectionProps} from './props';

export const SectionOther = ({inputData, setInputData}: SectionProps) => (
  <>
    <SectionTitle
      titleLabel={'game.skill_atk.name.other'}
      descriptionLabel={'game.skill_atk.desc.other'}
    />
    <NumericInput
      titleLabel={'game.skill_atk.name.other_element_bonus'}
      descriptionLabel={'game.skill_atk.desc.other_element_bonus'}
      inputData={inputData}
      inputKey="otherElemBonusPct"
      setInputData={setInputData}
    />
    <NumericInput
      titleLabel={'game.skill_atk.name.other_hp'}
      descriptionLabel={'game.skill_atk.desc.other_hp'}
      inputData={inputData}
      inputKey="otherCurrentHpPct"
      setInputData={setInputData}
    />
  </>
);

import React from 'react';

import {NumericInput} from '../../elements/numInput';
import {SectionTitle} from '../../elements/title';
import {SectionProps} from './props';

export const SectionBuff = ({inputData, setInputData}: SectionProps) => (
  <>
    <SectionTitle
      titleLabel={'game.skill_atk.name.buff_boost'}
      descriptionLabel={'game.skill_atk.desc.buff_boost'}
    />
    <NumericInput
      titleLabel={'game.skill_atk.name.buff_count'}
      descriptionLabel={'game.skill_atk.desc.buff_count'}
      inputData={inputData}
      inputKey="buffCount"
      setInputData={setInputData}
    />
    <NumericInput
      titleLabel={'game.skill_atk.name.buff_zone_self'}
      descriptionLabel={'game.skill_atk.desc.buff_zone_self'}
      inputData={inputData}
      inputKey="buffZoneSelf"
      setInputData={setInputData}
    />
    <NumericInput
      titleLabel={'game.skill_atk.name.buff_zone_ally'}
      descriptionLabel={'game.skill_atk.desc.buff_zone_ally'}
      inputData={inputData}
      inputKey="buffZoneAlly"
      setInputData={setInputData}
    />
  </>
);

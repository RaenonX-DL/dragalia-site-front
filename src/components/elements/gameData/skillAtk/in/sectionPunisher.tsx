import React from 'react';

import {NumericInput} from '../../elements/numInput';
import {SectionTitle} from '../../elements/title';
import {SectionProps} from './props';

export const SectionPunisher = ({inputData, setInputData}: SectionProps) => (
  <>
    <SectionTitle
      titleLabel={'game.skill_atk.name.punisher'}
      descriptionLabel={'game.skill_atk.desc.punisher'}
    />
    <NumericInput
      titleLabel={'game.skill_atk.name.punisher_bk'}
      descriptionLabel={'game.skill_atk.desc.punisher_bk'}
      inputData={inputData}
      inputKey="punishersBkPct"
      setInputData={setInputData}
    />
    <NumericInput
      titleLabel={'game.skill_atk.name.punisher_others'}
      descriptionLabel={'game.skill_atk.desc.punisher_others'}
      inputData={inputData}
      inputKey="punishersOtherPct"
      setInputData={setInputData}
    />
  </>
);

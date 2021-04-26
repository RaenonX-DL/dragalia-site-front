import React from 'react';

import {InlineCheck} from '../../elements/inlineCheck';
import {SectionTitle} from '../../elements/title';
import {SectionProps} from './props';

export const SectionEx = ({inputData, setInputData}: SectionProps) => (
  <>
    <SectionTitle
      titleLabel={'game.skill_atk.name.ex'}
      descriptionLabel={'game.skill_atk.desc.ex'}
    />
    <div className="text-center">
      <InlineCheck
        titleLabel={'game.skill_atk.name.ex_blade'}
        inputData={inputData}
        inputKey="exBlade"
        setInputData={setInputData}
      />
      <InlineCheck
        titleLabel={'game.skill_atk.name.ex_wand'}
        inputData={inputData}
        inputKey="exWand"
        setInputData={setInputData}
      />
    </div>
  </>
);

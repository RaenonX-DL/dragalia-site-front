import React from 'react';

import {InlineCheck} from '../../elements/inlineCheck';
import {NumericInput} from '../../elements/numInput';
import {SectionTitle} from '../../elements/title';
import {SectionProps} from './props';

export const SectionCrt = ({inputData, setInputData}: SectionProps) => {
  return (
    <>
      <SectionTitle
        titleLabel={'game.skill_atk.name.crt'}
        descriptionLabel={'game.skill_atk.desc.crt'}
      />
      <NumericInput
        titleLabel={'game.skill_atk.name.crt_rate'}
        descriptionLabel={'game.skill_atk.desc.crt_rate'}
        inputData={inputData}
        inputKey="criticalRatePct"
        setInputData={setInputData}
        maxValue={100}
      />
      <NumericInput
        titleLabel={'game.skill_atk.name.crt_damage'}
        descriptionLabel={'game.skill_atk.desc.crt_damage'}
        inputData={inputData}
        inputKey="criticalDamagePct"
        setInputData={setInputData}
        maxValue={400}
      />
      <div className="text-center">
        <InlineCheck
          titleLabel={'game.skill_atk.name.crt_inspired'}
          inputData={inputData}
          inputKey="criticalInspired"
          setInputData={setInputData}
        />
      </div>
    </>
  );
};

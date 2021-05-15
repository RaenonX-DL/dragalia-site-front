import React from 'react';

import {useI18n} from '../../../../../i18n/hook';
import {InlineCheck} from '../../elements/inlineCheck';
import {NumericInput} from '../../elements/numInput';
import {SectionTitle} from '../../elements/title';
import {SectionProps} from './props';

export const SectionSkill = ({inputData, setInputData}: SectionProps) => {
  const {t} = useI18n();

  return (
    <>
      <SectionTitle
        title={t((t) => t.game.skillAtk.name.skill)}
        description={t((t) => t.game.skillAtk.desc.skill)}
      />
      <NumericInput
        title={t((t) => t.game.skillAtk.name.skillPassive)}
        description={t((t) => t.game.skillAtk.desc.skillPassive)}
        inputData={inputData}
        inputKey="skillPassivePct"
        setInputData={setInputData}
      />
      <NumericInput
        title={t((t) => t.game.skillAtk.name.skillBuff)}
        description={t((t) => t.game.skillAtk.desc.skillBuff)}
        inputData={inputData}
        inputKey="skillBuffPct"
        setInputData={setInputData}
        maxValue={200}
      />
      <div className="text-center">
        <InlineCheck
          title={t((t) => t.game.skillAtk.name.skillEnergized)}
          inputData={inputData}
          inputKey="skillEnergized"
          setInputData={setInputData}
        />
      </div>
    </>
  );
};

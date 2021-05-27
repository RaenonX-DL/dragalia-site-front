import React from 'react';

import {useI18n} from '../../../../../i18n/hook';
import {NumericInput} from '../../../common/input/numeric';
import {SectionTitle} from '../../elements/title';
import {SectionProps} from './props';

export const SectionAtk = ({inputData, setInputData}: SectionProps) => {
  const {t} = useI18n();

  return (
    <>
      <SectionTitle
        title={t((t) => t.game.skillAtk.name.atk)}
        description={t((t) => t.game.skillAtk.desc.atk)}/>
      <NumericInput
        title={t((t) => t.game.skillAtk.name.atkInGame)}
        description={t((t) => t.game.skillAtk.desc.atkInGame)}
        inputData={inputData}
        inputKey="atkInGame"
        setInputData={setInputData}
      />
      <NumericInput
        title={t((t) => t.game.skillAtk.name.atkConditional)}
        description={t((t) => t.game.skillAtk.desc.atkConditional)}
        inputData={inputData}
        inputKey="atkConditionalPct"
        setInputData={setInputData}
      />
      <NumericInput
        title={t((t) => t.game.skillAtk.name.atkBuff)}
        description={t((t) => t.game.skillAtk.desc.atkBuff)}
        inputData={inputData}
        inputKey="atkBuffPct"
        setInputData={setInputData}
        maxValue={200}
      />
    </>
  );
};

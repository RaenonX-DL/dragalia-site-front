import React from 'react';

import {useI18n} from '../../../../../../i18n/hook';
import {NumericInput} from '../../../../common/input/numeric';
import {SectionTitle} from '../../../elements/title';
import {SectionProps} from '../props';


export const SectionOther = ({inputData, setInputData}: SectionProps) => {
  const {t} = useI18n();

  return (
    <>
      <SectionTitle
        title={t((t) => t.game.skillAtk.name.other)}
        description={t((t) => t.game.skillAtk.desc.other)}
      />
      <NumericInput
        title={t((t) => t.game.skillAtk.name.otherElementBonus)}
        description={t((t) => t.game.skillAtk.desc.otherElementBonus)}
        inputData={inputData}
        inputKey="otherElemBonusPct"
        setInputData={setInputData}
      />
      <NumericInput
        title={t((t) => t.game.skillAtk.name.otherHp)}
        description={t((t) => t.game.skillAtk.desc.otherHp)}
        inputData={inputData}
        inputKey="otherCurrentHpPct"
        setInputData={setInputData}
      />
    </>
  );
};

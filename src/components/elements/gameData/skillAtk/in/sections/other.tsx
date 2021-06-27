import React from 'react';

import {useI18n} from '../../../../../../i18n/hook';
import {NumericInput} from '../../../../common/input/numeric';
import {SectionTitle} from '../../../elements/title';
import {SectionProps} from '../props';
import {overwriteInputData} from '../utils';


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
        setInputData={setInputData}
        getValue={(inputData) => inputData.params.others.elemBonusPct}
        getUpdatedInputData={(newValue) => overwriteInputData(inputData, {params: {others: {elemBonusPct: newValue}}})}
      />
      <NumericInput
        title={t((t) => t.game.skillAtk.name.otherHp)}
        description={t((t) => t.game.skillAtk.desc.otherHp)}
        inputData={inputData}
        setInputData={setInputData}
        getValue={(inputData) => inputData.params.others.currentHpPct}
        getUpdatedInputData={(newValue) => overwriteInputData(inputData, {params: {others: {currentHpPct: newValue}}})}
      />
    </>
  );
};

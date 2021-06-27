import React from 'react';

import {useI18n} from '../../../../../../i18n/hook';
import {NumericInput} from '../../../../common/input/numeric';
import {SectionTitle} from '../../../elements/title';
import {SectionProps} from '../props';
import {overwriteInputData} from '../utils';


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
        setInputData={setInputData}
        getValue={(inputData) => inputData.params.atk.inGame}
        getUpdatedInputData={(newValue) => overwriteInputData(inputData, {params: {atk: {inGame: newValue}}})}
      />
      <NumericInput
        title={t((t) => t.game.skillAtk.name.atkConditional)}
        description={t((t) => t.game.skillAtk.desc.atkConditional)}
        inputData={inputData}
        setInputData={setInputData}
        getValue={(inputData) => inputData.params.atk.conditionalPct}
        getUpdatedInputData={(newValue) => overwriteInputData(inputData, {params: {atk: {conditionalPct: newValue}}})}
      />
      <NumericInput
        title={t((t) => t.game.skillAtk.name.atkBuff)}
        description={t((t) => t.game.skillAtk.desc.atkBuff)}
        inputData={inputData}
        setInputData={setInputData}
        getValue={(inputData) => inputData.params.atk.conditionalPct}
        getUpdatedInputData={(newValue) => overwriteInputData(inputData, {params: {atk: {buffPct: newValue}}})}
        maxValue={200}
      />
    </>
  );
};

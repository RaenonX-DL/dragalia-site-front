import React from 'react';

import {useI18n} from '../../../../../../i18n/hook';
import {InputPanel} from '../../../../input/main';
import {SectionProps} from '../props';
import {overwriteInputData} from '../utils';


export const SectionAtk = ({inputData, setInputData}: SectionProps) => {
  const {t} = useI18n();

  return (
    <InputPanel
      inputData={inputData}
      setInputData={setInputData}
      inputEntries={[
        {
          type: 'title',
          title: t((t) => t.game.skillAtk.name.atk),
          description: t((t) => t.game.skillAtk.desc.atk),
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.name.atk),
          description: t((t) => t.game.skillAtk.desc.atk),
          getValue: (inputData) => inputData.params.atk.inGame,
          getUpdatedInputData: (newValue) => (
            overwriteInputData(inputData, {params: {atk: {inGame: newValue}}})
          ),
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.name.atkConditional),
          description: t((t) => t.game.skillAtk.desc.atkConditional),
          getValue: (inputData) => inputData.params.atk.conditionalPct,
          getUpdatedInputData: (newValue) => (
            overwriteInputData(inputData, {params: {atk: {conditionalPct: newValue}}})
          ),
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.name.atkBuff),
          description: t((t) => t.game.skillAtk.desc.atkBuff),
          getValue: (inputData) => inputData.params.atk.buffPct,
          getUpdatedInputData: (newValue) => (
            overwriteInputData(inputData, {params: {atk: {buffPct: newValue}}})
          ),
          maxValue: 200,
        },
      ]}
    />
  );
};

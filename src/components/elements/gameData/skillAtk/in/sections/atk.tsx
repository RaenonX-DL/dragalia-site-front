import React from 'react';

import {useI18n} from '../../../../../../i18n/hook';
import {InputPanel} from '../../../../input/main';
import {SectionProps} from '../types';
import {overwriteInputData} from '../utils/inputData';


export const SectionAtk = ({inputData, setInputData}: SectionProps) => {
  const {t} = useI18n();

  return (
    <InputPanel
      inputData={inputData}
      setInputData={setInputData}
      inputEntries={[
        {
          type: 'title',
          title: t((t) => t.game.skillAtk.input.atk.title.name),
          description: t((t) => t.game.skillAtk.input.atk.title.desc),
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.input.atk.inGame.name),
          description: t((t) => t.game.skillAtk.input.atk.inGame.desc),
          getValue: (inputData) => inputData.params.atk.inGame,
          getUpdatedInputData: (newValue) => (
            overwriteInputData(inputData, {params: {atk: {inGame: newValue}}})
          ),
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.input.atk.conditional.name),
          description: t((t) => t.game.skillAtk.input.atk.conditional.desc),
          getValue: (inputData) => inputData.params.atk.conditionalPct,
          getUpdatedInputData: (newValue) => (
            overwriteInputData(inputData, {params: {atk: {conditionalPct: newValue}}})
          ),
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.input.atk.buff.name),
          description: t((t) => t.game.skillAtk.input.atk.buff.desc),
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

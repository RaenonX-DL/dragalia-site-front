import React from 'react';

import {useI18n} from '../../../../../../i18n/hook';
import {InputPanel} from '../../../../../elements/input/panel/main';
import {SectionProps} from '../types';
import {overrideInputData} from '../utils/inputData';


export const SectionOther = ({inputData, setInputData}: SectionProps) => {
  const {t} = useI18n();

  return (
    <InputPanel
      inputData={inputData}
      setInputData={setInputData}
      inputEntries={[
        {
          type: 'title',
          title: t((t) => t.game.skillAtk.input.other.title.name),
          description: t((t) => t.game.skillAtk.input.other.title.desc),
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.input.other.elemBonus.name),
          description: t((t) => t.game.skillAtk.input.other.elemBonus.desc),
          getValue: (inputData) => inputData.params.others.elemBonusPct,
          getUpdatedInputData: (newValue) => (
            overrideInputData(inputData, {params: {others: {elemBonusPct: newValue}}})
          ),
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.input.other.hp.name),
          description: t((t) => t.game.skillAtk.input.other.hp.name),
          getValue: (inputData) => inputData.params.others.currentHpPct,
          getUpdatedInputData: (newValue) => (
            overrideInputData(inputData, {params: {others: {currentHpPct: newValue}}})
          ),
        },
      ]}
    />
  );
};

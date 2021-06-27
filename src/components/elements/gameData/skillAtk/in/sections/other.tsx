import React from 'react';

import {useI18n} from '../../../../../../i18n/hook';
import {InputPanel} from '../../../../input/main';
import {SectionProps} from '../props';
import {overwriteInputData} from '../utils';


export const SectionOther = ({inputData, setInputData}: SectionProps) => {
  const {t} = useI18n();

  return (
    <InputPanel
      inputData={inputData}
      setInputData={setInputData}
      inputEntries={[
        {
          type: 'title',
          title: t((t) => t.game.skillAtk.name.other),
          description: t((t) => t.game.skillAtk.desc.other),
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.name.otherElementBonus),
          description: t((t) => t.game.skillAtk.desc.otherElementBonus),
          getValue: (inputData) => inputData.params.others.elemBonusPct,
          getUpdatedInputData: (newValue) => (
            overwriteInputData(inputData, {params: {others: {elemBonusPct: newValue}}})
          ),
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.name.otherHp),
          description: t((t) => t.game.skillAtk.desc.otherHp),
          getValue: (inputData) => inputData.params.others.currentHpPct,
          getUpdatedInputData: (newValue) => (
            overwriteInputData(inputData, {params: {others: {currentHpPct: newValue}}})
          ),
        },
      ]}
    />
  );
};

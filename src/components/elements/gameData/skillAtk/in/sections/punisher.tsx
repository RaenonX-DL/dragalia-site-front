import React from 'react';

import {useI18n} from '../../../../../../i18n/hook';
import {InputPanel} from '../../../../input/main';
import {SectionProps} from '../types';
import {overwriteInputData} from '../utils';


export const SectionPunisher = ({inputData, setInputData}: SectionProps) => {
  const {t} = useI18n();

  return (
    <InputPanel
      inputData={inputData}
      setInputData={setInputData}
      inputEntries={[
        {
          type: 'title',
          title: t((t) => t.game.skillAtk.name.punisher),
          description: t((t) => t.game.skillAtk.desc.punisher),
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.name.punisherBk),
          description: t((t) => t.game.skillAtk.desc.punisherBk),
          getValue: (inputData) => inputData.params.punishers.bkPct,
          getUpdatedInputData: (newValue) => (
            overwriteInputData(inputData, {params: {punishers: {bkPct: newValue}}})
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

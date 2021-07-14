import React from 'react';

import {useI18n} from '../../../../../../i18n/hook';
import {InputPanel} from '../../../../input/main';
import {SectionProps} from '../types';
import {overwriteInputData} from '../utils/inputData';


export const SectionPunisher = ({inputData, setInputData}: SectionProps) => {
  const {t} = useI18n();

  return (
    <InputPanel
      inputData={inputData}
      setInputData={setInputData}
      inputEntries={[
        {
          type: 'title',
          title: t((t) => t.game.skillAtk.input.punisher.title.name),
          description: t((t) => t.game.skillAtk.input.punisher.title.desc),
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.input.punisher.bk.name),
          description: t((t) => t.game.skillAtk.input.punisher.bk.desc),
          getValue: (inputData) => inputData.params.punishers.bkPct,
          getUpdatedInputData: (newValue) => (
            overwriteInputData(inputData, {params: {punishers: {bkPct: newValue}}})
          ),
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.input.punisher.others.name),
          description: t((t) => t.game.skillAtk.input.punisher.others.desc),
          getValue: (inputData) => inputData.params.punishers.othersPct,
          getUpdatedInputData: (newValue) => (
            overwriteInputData(inputData, {params: {punishers: {othersPct: newValue}}})
          ),
        },
      ]}
    />
  );
};

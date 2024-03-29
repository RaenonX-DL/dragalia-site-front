import React from 'react';

import {useI18n} from '../../../../../../i18n/hook';
import {InputPanel} from '../../../../../elements/input/panel/main';
import {SectionProps} from '../types';
import {overrideInputData} from '../utils/inputData';


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
            overrideInputData(inputData, {params: {punishers: {bkPct: newValue}}})
          ),
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.input.punisher.others.name),
          description: t((t) => t.game.skillAtk.input.punisher.others.desc),
          getValue: (inputData) => inputData.params.punishers.othersPct,
          getUpdatedInputData: (newValue) => (
            overrideInputData(inputData, {params: {punishers: {othersPct: newValue}}})
          ),
        },
      ]}
    />
  );
};

import React from 'react';

import {useI18n} from '../../../../../../i18n/hook';
import {InputPanel} from '../../../../input/main';
import {SectionProps} from '../types';
import {overwriteInputData} from '../utils/inputData';


export const SectionBuff = ({inputData, setInputData}: SectionProps) => {
  const {t} = useI18n();

  return (
    <InputPanel
      inputData={inputData}
      setInputData={setInputData}
      inputEntries={[
        {
          type: 'title',
          title: t((t) => t.game.skillAtk.input.buff.boost.name),
          description: t((t) => t.game.skillAtk.input.buff.boost.desc),
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.input.buff.count.name),
          description: t((t) => t.game.skillAtk.input.buff.count.desc),
          getValue: (inputData) => inputData.params.buff.count,
          getUpdatedInputData: (newValue) => (
            overwriteInputData(inputData, {params: {buff: {count: newValue}}})
          ),
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.input.buff.zone.self.name),
          description: t((t) => t.game.skillAtk.input.buff.zone.self.desc),
          getValue: (inputData) => inputData.params.buff.zone.self,
          getUpdatedInputData: (newValue) => (
            overwriteInputData(inputData, {params: {buff: {zone: {self: newValue}}}})
          ),
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.input.buff.zone.ally.name),
          description: t((t) => t.game.skillAtk.input.buff.zone.ally.desc),
          getValue: (inputData) => inputData.params.buff.zone.ally,
          getUpdatedInputData: (newValue) => (
            overwriteInputData(inputData, {params: {buff: {zone: {ally: newValue}}}})
          ),
        },
      ]}
    />
  );
};

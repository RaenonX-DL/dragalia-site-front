import React from 'react';

import {useI18n} from '../../../../../../i18n/hook';
import {InputPanel} from '../../../../input/main';
import {SectionProps} from '../types';
import {overwriteInputData} from '../utils';


export const SectionBuff = ({inputData, setInputData}: SectionProps) => {
  const {t} = useI18n();

  return (
    <InputPanel
      inputData={inputData}
      setInputData={setInputData}
      inputEntries={[
        {
          type: 'title',
          title: t((t) => t.game.skillAtk.name.buffBoost),
          description: t((t) => t.game.skillAtk.desc.buffBoost),
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.name.buffCount),
          description: t((t) => t.game.skillAtk.desc.buffCount),
          getValue: (inputData) => inputData.params.buff.count,
          getUpdatedInputData: (newValue) => (
            overwriteInputData(inputData, {params: {buff: {count: newValue}}})
          ),
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.name.buffZoneSelf),
          description: t((t) => t.game.skillAtk.desc.buffZoneSelf),
          getValue: (inputData) => inputData.params.buff.zone.self,
          getUpdatedInputData: (newValue) => (
            overwriteInputData(inputData, {params: {buff: {zone: {self: newValue}}}})
          ),
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.name.buffZoneAlly),
          description: t((t) => t.game.skillAtk.desc.buffZoneAlly),
          getValue: (inputData) => inputData.params.buff.zone.ally,
          getUpdatedInputData: (newValue) => (
            overwriteInputData(inputData, {params: {buff: {zone: {ally: newValue}}}})
          ),
        },
      ]}
    />
  );
};

import React from 'react';

import {useI18n} from '../../../../../../i18n/hook';
import {NumericInput} from '../../../../common/input/numeric';
import {SectionTitle} from '../../../elements/title';
import {SectionProps} from '../props';
import {overwriteInputData} from '../utils';


export const SectionBuff = ({inputData, setInputData}: SectionProps) => {
  const {t} = useI18n();

  return (
    <>
      <SectionTitle
        title={t((t) => t.game.skillAtk.name.buffBoost)}
        description={t((t) => t.game.skillAtk.desc.buffBoost)}
      />
      <NumericInput
        title={t((t) => t.game.skillAtk.name.buffCount)}
        description={t((t) => t.game.skillAtk.desc.buffCount)}
        inputData={inputData}
        setInputData={setInputData}
        getValue={(inputData) => inputData.params.buff.count}
        getUpdatedInputData={(newValue) => overwriteInputData(inputData, {params: {buff: {count: newValue}}})}
      />
      <NumericInput
        title={t((t) => t.game.skillAtk.name.buffZoneSelf)}
        description={t((t) => t.game.skillAtk.desc.buffZoneSelf)}
        inputData={inputData}
        setInputData={setInputData}
        getValue={(inputData) => inputData.params.buff.zone.self}
        getUpdatedInputData={(newValue) => overwriteInputData(inputData, {params: {buff: {zone: {self: newValue}}}})}
      />
      <NumericInput
        title={t((t) => t.game.skillAtk.name.buffZoneAlly)}
        description={t((t) => t.game.skillAtk.desc.buffZoneAlly)}
        inputData={inputData}
        setInputData={setInputData}
        getValue={(inputData) => inputData.params.buff.zone.ally}
        getUpdatedInputData={(newValue) => overwriteInputData(inputData, {params: {buff: {zone: {ally: newValue}}}})}
      />
    </>
  );
};

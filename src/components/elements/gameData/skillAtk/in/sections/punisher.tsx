import React from 'react';

import {useI18n} from '../../../../../../i18n/hook';
import {NumericInput} from '../../../../common/input/numeric';
import {SectionTitle} from '../../../elements/title';
import {SectionProps} from '../props';
import {overwriteInputData} from '../utils';


export const SectionPunisher = ({inputData, setInputData}: SectionProps) => {
  const {t} = useI18n();

  return (
    <>
      <SectionTitle
        title={t((t) => t.game.skillAtk.name.punisher)}
        description={t((t) => t.game.skillAtk.desc.punisher)}
      />
      <NumericInput
        title={t((t) => t.game.skillAtk.name.punisherBk)}
        description={t((t) => t.game.skillAtk.desc.punisherBk)}
        inputData={inputData}
        setInputData={setInputData}
        getValue={(inputData) => inputData.params.punishers.bkPct}
        getUpdatedInputData={(newValue) => overwriteInputData(inputData, {params: {punishers: {bkPct: newValue}}})}
      />
      <NumericInput
        title={t((t) => t.game.skillAtk.name.punisherOthers)}
        description={t((t) => t.game.skillAtk.desc.punisherOthers)}
        inputData={inputData}
        setInputData={setInputData}
        getValue={(inputData) => inputData.params.punishers.othersPct}
        getUpdatedInputData={(newValue) => overwriteInputData(inputData, {params: {punishers: {othersPct: newValue}}})}
      />
    </>
  );
};

import React from 'react';

import {useI18n} from '../../../../../../i18n/hook';
import {InputPanel} from '../../../../input/main';
import {SectionProps} from '../types';
import {overwriteInputData} from '../utils/inputData';


export const SectionDragon = ({inputData, setInputData}: SectionProps) => {
  const {t} = useI18n();

  return (
    <InputPanel
      inputData={inputData}
      setInputData={setInputData}
      inputEntries={[
        {
          type: 'title',
          title: t((t) => t.game.skillAtk.input.dragon.title.name),
          description: t((t) => t.game.skillAtk.input.dragon.title.desc),
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.input.dragon.facility.name),
          description: t((t) => t.game.skillAtk.input.dragon.facility.desc),
          getValue: (inputData) => inputData.params.dragon.facilityPct,
          getUpdatedInputData: (newValue) => (
            overwriteInputData(inputData, {params: {dragon: {facilityPct: newValue}}})
          ),
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.input.dragon.passive.name),
          description: t((t) => t.game.skillAtk.input.dragon.passive.desc),
          getValue: (inputData) => inputData.params.dragon.passivePct,
          getUpdatedInputData: (newValue) => (
            overwriteInputData(inputData, {params: {dragon: {passivePct: newValue}}})
          ),
        },
      ]}
    />
  );
};

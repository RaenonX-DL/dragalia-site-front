import React from 'react';

import {useI18n} from '../../../../../../i18n/hook';
import {InputPanel} from '../../../../input/main';
import {SectionProps} from '../types';
import {overrideInputData} from '../utils/inputData';


export const SectionCrt = ({inputData, setInputData}: SectionProps) => {
  const {t} = useI18n();

  return (
    <InputPanel
      inputData={inputData}
      setInputData={setInputData}
      inputEntries={[
        {
          type: 'title',
          title: t((t) => t.game.skillAtk.input.crt.title.name),
          description: t((t) => t.game.skillAtk.input.crt.title.desc),
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.input.crt.rate.name),
          description: t((t) => t.game.skillAtk.input.crt.rate.desc),
          getValue: (inputData) => inputData.params.crt.ratePct,
          getUpdatedInputData: (newValue) => (
            overrideInputData(inputData, {params: {crt: {ratePct: newValue}}})
          ),
          maxValue: 100,
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.input.crt.damage.name),
          description: t((t) => t.game.skillAtk.input.crt.damage.desc),
          getValue: (inputData) => inputData.params.crt.damagePct,
          getUpdatedInputData: (newValue) => (
            overrideInputData(inputData, {params: {crt: {damagePct: newValue}}})
          ),
          maxValue: 400,
        },
        {
          type: 'inputCheckGroup',
          checkboxes: [
            {
              text: t((t) => t.game.skillAtk.input.crt.inspired),
              getValue: (inputData) => inputData.params.crt.inspired,
              getUpdatedInputData: (newValue) => (
                overrideInputData(inputData, {params: {crt: {inspired: newValue}}})
              ),
            },
          ],
        },
      ]}
    />
  );
};

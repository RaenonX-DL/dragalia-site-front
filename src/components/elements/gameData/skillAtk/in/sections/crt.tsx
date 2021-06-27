import React from 'react';

import {useI18n} from '../../../../../../i18n/hook';
import {InputPanel} from '../../../../input/main';
import {SectionProps} from '../props';
import {overwriteInputData} from '../utils';


export const SectionCrt = ({inputData, setInputData}: SectionProps) => {
  const {t} = useI18n();

  return (
    <InputPanel
      inputData={inputData}
      setInputData={setInputData}
      inputEntries={[
        {
          type: 'title',
          title: t((t) => t.game.skillAtk.name.crt),
          description: t((t) => t.game.skillAtk.desc.crt),
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.name.crtRate),
          description: t((t) => t.game.skillAtk.desc.crtRate),
          getValue: (inputData) => inputData.params.crt.ratePct,
          getUpdatedInputData: (newValue) => (
            overwriteInputData(inputData, {params: {crt: {ratePct: newValue}}})
          ),
          maxValue: 100,
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.name.crtDamage),
          description: t((t) => t.game.skillAtk.desc.crtDamage),
          getValue: (inputData) => inputData.params.crt.damagePct,
          getUpdatedInputData: (newValue) => (
            overwriteInputData(inputData, {params: {crt: {damagePct: newValue}}})
          ),
          maxValue: 400,
        },
        {
          type: 'inputCheckGroup',
          checkboxes: [
            {
              text: t((t) => t.game.skillAtk.name.crtInspired),
              getValue: (inputData) => inputData.params.crt.inspired,
              getUpdatedInputData: (newValue) => (
                overwriteInputData(inputData, {params: {crt: {inspired: newValue}}})
              ),
            },
          ],
        },
      ]}
    />
  );
};

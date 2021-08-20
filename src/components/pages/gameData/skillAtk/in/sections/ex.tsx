import React from 'react';

import {useI18n} from '../../../../../../i18n/hook';
import {InputPanel} from '../../../../../elements/input/panel/main';
import {SectionProps} from '../types';
import {overrideInputData} from '../utils/inputData';


export const SectionEx = ({inputData, setInputData}: SectionProps) => {
  const {t} = useI18n();

  return (
    <InputPanel
      inputData={inputData}
      setInputData={setInputData}
      inputEntries={[
        {
          type: 'title',
          title: t((t) => t.game.skillAtk.input.ex.title),
          description: t((t) => t.game.skillAtk.input.ex.description),
        },
        {
          type: 'inputCheckGroup',
          checkboxes: [
            {
              text: t((t) => t.game.skillAtk.input.ex.blade),
              getValue: (inputData) => inputData.params.ex.blade,
              getUpdatedInputData: (newValue) => (
                overrideInputData(inputData, {params: {ex: {blade: newValue}}})
              ),
            },
            {
              text: t((t) => t.game.skillAtk.input.ex.wand),
              getValue: (inputData) => inputData.params.ex.wand,
              getUpdatedInputData: (newValue) => (
                overrideInputData(inputData, {params: {ex: {wand: newValue}}})
              ),
            },
          ],
        },
      ]}
    />
  );
};

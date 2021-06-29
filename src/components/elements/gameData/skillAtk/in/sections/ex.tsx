import React from 'react';

import {useI18n} from '../../../../../../i18n/hook';
import {InputPanel} from '../../../../input/main';
import {SectionProps} from '../types';
import {overwriteInputData} from '../utils/inputData';


export const SectionEx = ({inputData, setInputData}: SectionProps) => {
  const {t} = useI18n();

  return (
    <InputPanel
      inputData={inputData}
      setInputData={setInputData}
      inputEntries={[
        {
          type: 'title',
          title: t((t) => t.game.skillAtk.name.ex),
          description: t((t) => t.game.skillAtk.desc.ex),
        },
        {
          type: 'inputCheckGroup',
          checkboxes: [
            {
              text: t((t) => t.game.skillAtk.name.exBlade),
              getValue: (inputData) => inputData.params.ex.blade,
              getUpdatedInputData: (newValue) => (
                overwriteInputData(inputData, {params: {ex: {blade: newValue}}})
              ),
            },
            {
              text: t((t) => t.game.skillAtk.name.exWand),
              getValue: (inputData) => inputData.params.ex.wand,
              getUpdatedInputData: (newValue) => (
                overwriteInputData(inputData, {params: {ex: {wand: newValue}}})
              ),
            },
          ],
        },
      ]}
    />
  );
};

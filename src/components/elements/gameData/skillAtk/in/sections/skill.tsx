import React from 'react';

import {useI18n} from '../../../../../../i18n/hook';
import {InputPanel} from '../../../../input/main';
import {SectionProps} from '../types';
import {overwriteInputData} from '../utils/inputData';


export const SectionSkill = ({inputData, setInputData}: SectionProps) => {
  const {t} = useI18n();

  return (
    <InputPanel
      inputData={inputData}
      setInputData={setInputData}
      inputEntries={[
        {
          type: 'title',
          title: t((t) => t.game.skillAtk.input.skill.title.name),
          description: t((t) => t.game.skillAtk.input.skill.title.desc),
        },
        {
          type: 'inputNumber',
          title: t((t) => t.game.skillAtk.input.skill.passive.name),
          description: t((t) => t.game.skillAtk.input.skill.passive.desc),
          getValue: (inputData) => inputData.params.skill.passivePct,
          getUpdatedInputData: (newValue) => (
            overwriteInputData(inputData, {params: {skill: {passivePct: newValue}}})
          ),
          maxValue: 200,
        },
        {
          type: 'inputCheckGroup',
          checkboxes: [
            {
              text: t((t) => t.game.skillAtk.input.skill.energized),
              getValue: (inputData) => inputData.params.skill.energized,
              getUpdatedInputData: (newValue) => (
                overwriteInputData(inputData, {params: {skill: {energized: newValue}}})
              ),
            },
          ],
        },
      ]}
    />
  );
};

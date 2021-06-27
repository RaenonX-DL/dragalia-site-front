import React from 'react';

import {useI18n} from '../../../../../i18n/hook';
import {InputPanel} from '../../../input/main';
import {InputPanelCommonProps} from '../../../input/types';
import {InputData} from './types';
import {overwriteInputData} from './utils';


export const DisplayItemPicker = ({inputData, setInputData}: InputPanelCommonProps<InputData>) => {
  const {t} = useI18n();

  return (
    <InputPanel
      inputData={inputData}
      setInputData={setInputData}
      inputEntries={[
        {
          type: 'title',
          title: t((t) => t.game.skillAtk.display.title),
          description: t((t) => t.game.skillAtk.display.desc),
        },
        {
          type: 'inputCheckGroup',
          checkboxes: [
            {
              text: t((t) => t.game.skillAtk.display.options.damageInfo),
              getValue: (inputData) => inputData.display.damageInfo,
              getUpdatedInputData: (newValue) => (
                overwriteInputData(inputData, {display: {damageInfo: newValue}})
              ),
            },
            {
              text: t((t) => t.game.skillAtk.display.options.affliction),
              getValue: (inputData) => inputData.display.affliction,
              getUpdatedInputData: (newValue) => (
                overwriteInputData(inputData, {display: {affliction: newValue}})
              ),
            },
            {
              text: t((t) => t.game.skillAtk.display.options.spInfo),
              getValue: (inputData) => inputData.display.spInfo,
              getUpdatedInputData: (newValue) => (
                overwriteInputData(inputData, {display: {spInfo: newValue}})
              ),
            },
            {
              text: t((t) => t.game.skillAtk.display.options.actualDamage),
              getValue: (inputData) => inputData.display.actualDamage,
              getUpdatedInputData: (newValue) => (
                overwriteInputData(inputData, {display: {actualDamage: newValue}})
              ),
            },
            {
              text: t((t) => t.game.skillAtk.display.options.damageDistribution),
              getValue: (inputData) => inputData.display.damageDist,
              getUpdatedInputData: (newValue) => (
                overwriteInputData(inputData, {display: {damageDist: newValue}})
              ),
            },
            {
              text: t((t) => t.game.skillAtk.display.options.animationInfo),
              getValue: (inputData) => inputData.display.animationInfo,
              getUpdatedInputData: (newValue) => (
                overwriteInputData(inputData, {display: {animationInfo: newValue}})
              ),
            },
          ],
        },
      ]}
    />
  );
};

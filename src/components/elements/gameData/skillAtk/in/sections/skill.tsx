import React from 'react';

import {useI18n} from '../../../../../../i18n/hook';
import {CheckboxInput} from '../../../../common/check/item/checkbox';
import {NumericInput} from '../../../../common/input/numeric';
import {SectionTitle} from '../../../elements/title';
import {SectionProps} from '../props';
import {overwriteInputData} from '../utils';


export const SectionSkill = ({inputData, setInputData}: SectionProps) => {
  const {t} = useI18n();

  return (
    <>
      <SectionTitle
        title={t((t) => t.game.skillAtk.name.skill)}
        description={t((t) => t.game.skillAtk.desc.skill)}
      />
      <NumericInput
        title={t((t) => t.game.skillAtk.name.skillPassive)}
        description={t((t) => t.game.skillAtk.desc.skillPassive)}
        inputData={inputData}
        setInputData={setInputData}
        getValue={(inputData) => inputData.params.skill.passivePct}
        getUpdatedInputData={(newValue) => overwriteInputData(inputData, {params: {skill: {passivePct: newValue}}})}
      />
      <NumericInput
        title={t((t) => t.game.skillAtk.name.skillBuff)}
        description={t((t) => t.game.skillAtk.desc.skillBuff)}
        inputData={inputData}
        setInputData={setInputData}
        getValue={(inputData) => inputData.params.skill.buffPct}
        getUpdatedInputData={(newValue) => overwriteInputData(inputData, {params: {skill: {buffPct: newValue}}})}
        maxValue={200}
      />
      <div className="text-center">
        <CheckboxInput
          text={t((t) => t.game.skillAtk.name.skillEnergized)}
          inputData={inputData}
          setInputData={setInputData}
          getValue={(inputData) => inputData.params.skill.energized}
          getUpdatedInputData={(newValue) => overwriteInputData(inputData, {params: {skill: {energized: newValue}}})}
        />
      </div>
    </>
  );
};

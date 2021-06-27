import React from 'react';

import {useI18n} from '../../../../../../i18n/hook';
import {CheckboxInput} from '../../../../common/check/item/checkbox';
import {NumericInput} from '../../../../common/input/numeric';
import {SectionTitle} from '../../../elements/title';
import {SectionProps} from '../props';
import {overwriteInputData} from '../utils';


export const SectionCrt = ({inputData, setInputData}: SectionProps) => {
  const {t} = useI18n();

  return (
    <>
      <SectionTitle
        title={t((t) => t.game.skillAtk.name.crt)}
        description={t((t) => t.game.skillAtk.desc.crt)}
      />
      <NumericInput
        title={t((t) => t.game.skillAtk.name.crtRate)}
        description={t((t) => t.game.skillAtk.desc.crtRate)}
        inputData={inputData}
        setInputData={setInputData}
        getValue={(inputData) => inputData.params.crt.ratePct}
        getUpdatedInputData={(newValue) => overwriteInputData(inputData, {params: {crt: {ratePct: newValue}}})}
        maxValue={100}
      />
      <NumericInput
        title={t((t) => t.game.skillAtk.name.crtDamage)}
        description={t((t) => t.game.skillAtk.desc.crtDamage)}
        inputData={inputData}
        setInputData={setInputData}
        getValue={(inputData) => inputData.params.crt.damagePct}
        getUpdatedInputData={(newValue) => overwriteInputData(inputData, {params: {crt: {damagePct: newValue}}})}
        maxValue={400}
      />
      <div className="text-center">
        <CheckboxInput
          text={t((t) => t.game.skillAtk.name.crtInspired)}
          inputData={inputData}
          setInputData={setInputData}
          getValue={(inputData) => inputData.params.crt.inspired}
          getUpdatedInputData={(newValue) => overwriteInputData(inputData, {params: {crt: {inspired: newValue}}})}
        />
      </div>
    </>
  );
};

import React from 'react';

import {useI18n} from '../../../../../../i18n/hook';
import {CheckboxInput} from '../../../../common/check/item/checkbox';
import {SectionTitle} from '../../../elements/title';
import {SectionProps} from '../props';
import {overwriteInputData} from '../utils';


export const SectionEx = ({inputData, setInputData}: SectionProps) => {
  const {t} = useI18n();

  return (
    <>
      <SectionTitle
        title={t((t) => t.game.skillAtk.name.ex)}
        description={t((t) => t.game.skillAtk.desc.ex)}
      />
      <div className="text-center">
        <CheckboxInput
          text={t((t) => t.game.skillAtk.name.exBlade)}
          inputData={inputData}
          setInputData={setInputData}
          getValue={(inputData) => inputData.params.ex.blade}
          getUpdatedInputData={(newValue) => overwriteInputData(inputData, {params: {ex: {blade: newValue}}})}
        />
        <CheckboxInput
          text={t((t) => t.game.skillAtk.name.exWand)}
          inputData={inputData}
          setInputData={setInputData}
          getValue={(inputData) => inputData.params.ex.wand}
          getUpdatedInputData={(newValue) => overwriteInputData(inputData, {params: {ex: {wand: newValue}}})}
        />
      </div>
    </>
  );
};

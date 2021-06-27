import React from 'react';

import {ElementEnums, ExBuffParams} from '../../../../../api-def/resources';
import {useI18n} from '../../../../../i18n/hook';
import {EnumCheckboxGroup} from '../../../common/check/enum/checkbox';
import {SectionTitle} from '../../elements/title';
import {InputSectionBaseProps} from '../../props';
import {InputData} from './types';
import {overwriteInputData} from './utils';


type SectionProps = InputSectionBaseProps<InputData> & {
  elementEnums: ElementEnums,
  exBuffParams: ExBuffParams
}

export const SectionFilter = ({
  inputData,
  setInputData,
  elementEnums,
  exBuffParams,
}: SectionProps) => {
  const {t} = useI18n();

  return (
    <>
      <SectionTitle
        title={t((t) => t.game.ex.name.filterElement)}
        description={t((t) => t.game.ex.desc.filterElement)}
      />
      <EnumCheckboxGroup
        options={elementEnums.elemental}
        inputData={inputData}
        setInputData={setInputData}
        getValue={(inputData) => inputData.filter.elements}
        getUpdatedInputData={(newValue) => overwriteInputData(inputData, {filter: {elements: newValue}})}
      />
      <SectionTitle
        title={t((t) => t.game.ex.name.filterExBuffParam)}
        description={t((t) => t.game.ex.desc.filterExBuffParam)}
      />
      <EnumCheckboxGroup
        options={exBuffParams.exBuffParam}
        inputData={inputData}
        setInputData={setInputData}
        getValue={(inputData) => inputData.filter.exBuffParams}
        getUpdatedInputData={(newValue) => overwriteInputData(inputData, {filter: {exBuffParams: newValue}})}
        imageHeight="2rem"
      />
      <SectionTitle
        title={t((t) => t.game.ex.name.filterChainedExBuffParam)}
        description={t((t) => t.game.ex.desc.filterChainedExBuffParam)}
      />
      <EnumCheckboxGroup
        options={exBuffParams.chainedExBuffParam}
        inputData={inputData}
        setInputData={setInputData}
        getValue={(inputData) => inputData.filter.cexBuffParams}
        getUpdatedInputData={(newValue) => overwriteInputData(inputData, {filter: {cexBuffParams: newValue}})}
        imageHeight="2rem"
      />
    </>
  );
};

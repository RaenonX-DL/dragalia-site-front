import React from 'react';

import {ElementEnums, ExBuffParams} from '../../../../../utils/services/resources/types';
import {EnumChecksBox} from '../../elements/enumChecksBox';
import {SectionTitle} from '../../elements/title';
import {InputSectionBaseProps} from '../../props';
import {InputData} from './types';

type SectionProps<D extends InputData> = InputSectionBaseProps<D> & {
  elementEnums: ElementEnums,
  exBuffParams: ExBuffParams
}


export const SectionFilter = <D extends InputData>({
  inputData,
  setInputData,
  elementEnums,
  exBuffParams,
}: SectionProps<D>) => {
  return (
    <>
      <SectionTitle
        titleLabel={'game.ex.name.filter_element'}
        descriptionLabel={'game.ex.desc.filter_element'}
      />
      <EnumChecksBox
        options={elementEnums.elemental}
        inputData={inputData}
        inputKey="filterElementCode"
        setInputData={setInputData}
      />
      <SectionTitle
        titleLabel={'game.ex.name.filter_ex_buff_param'}
        descriptionLabel={'game.ex.desc.filter_ex_buff_param'}
      />
      <EnumChecksBox
        options={exBuffParams.exBuffParam}
        inputData={inputData}
        inputKey="filterExBuffParamCode"
        setInputData={setInputData}
        imageHeight="2rem"
      />
      <SectionTitle
        titleLabel={'game.ex.name.filter_chained_ex_buff_param'}
        descriptionLabel={'game.ex.desc.filter_chained_ex_buff_param'}
      />
      <EnumChecksBox
        options={exBuffParams.chainedExBuffParam}
        inputData={inputData}
        inputKey="filterExBuffParamCode"
        setInputData={setInputData}
        imageHeight="2rem"
      />
    </>
  );
};

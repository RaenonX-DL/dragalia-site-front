import React, {ChangeEventHandler} from 'react';
import {ElementEnums, ExBuffParams} from '../../../../utils/services/resources/types';

import {EnumResourceChecks, SectionTitle} from '../common/element';

export type InputData = {
  filterElementCode: Array<number>,
  filterExBuffParamCode: Array<number>,
  filterChainedExBuffParamCode: Array<number>,
}

type SectionProps = {
  inputData: InputData,
  fnUpdateInputDataCheckMulti: (code: number) => ChangeEventHandler<HTMLInputElement>,
  elementEnums: ElementEnums,
  exBuffParams: ExBuffParams
}


export const SectionFilter = (props: SectionProps) => {
  const {
    inputData,
    fnUpdateInputDataCheckMulti,
    elementEnums,
    exBuffParams,
  } = props;

  return (
    <>
      <SectionTitle
        titleLabel={'game.ex.name.filter_element'}
        descriptionLabel={'game.ex.desc.filter_element'}/>
      <EnumResourceChecks
        enumEntries={elementEnums.elemental}
        type="checkbox" groupName="filterElementCode" onChange={fnUpdateInputDataCheckMulti}
        isChecked={(code: number) => inputData.filterElementCode.includes(code)}/>
      <SectionTitle
        titleLabel={'game.ex.name.filter_ex_buff_param'}
        descriptionLabel={'game.ex.desc.filter_ex_buff_param'}/>
      <EnumResourceChecks
        enumEntries={exBuffParams.exBuffParam} imageHeight='2rem'
        type="checkbox" groupName="filterExBuffParamCode" onChange={fnUpdateInputDataCheckMulti}
        isChecked={(code: number) => inputData.filterExBuffParamCode.includes(code)}/>
      <SectionTitle
        titleLabel={'game.ex.name.filter_chained_ex_buff_param'}
        descriptionLabel={'game.ex.desc.filter_chained_ex_buff_param'}/>
      <EnumResourceChecks
        enumEntries={exBuffParams.chainedExBuffParam} imageHeight='2rem'
        type="checkbox" groupName="filterChainedExBuffParamCode" onChange={fnUpdateInputDataCheckMulti}
        isChecked={(code: number) => inputData.filterChainedExBuffParamCode.includes(code)}/>
    </>
  );
};

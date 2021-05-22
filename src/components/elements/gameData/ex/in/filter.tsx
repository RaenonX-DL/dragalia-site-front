import React from 'react';

import {useI18n} from '../../../../../i18n/hook';
import {ElementEnums, ExBuffParams} from '../../../../../utils/services/resources/types';
import {EnumChecksBox} from '../../../common/check/enumChecksBox';
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
  const {t} = useI18n();

  return (
    <>
      <SectionTitle
        title={t((t) => t.game.ex.name.filterElement)}
        description={t((t) => t.game.ex.desc.filterElement)}
      />
      <EnumChecksBox
        options={elementEnums.elemental}
        inputData={inputData}
        inputKey="filterElementCode"
        setInputData={setInputData}
      />
      <SectionTitle
        title={t((t) => t.game.ex.name.filterExBuffParam)}
        description={t((t) => t.game.ex.desc.filterExBuffParam)}
      />
      <EnumChecksBox
        options={exBuffParams.exBuffParam}
        inputData={inputData}
        inputKey="filterExBuffParamCode"
        setInputData={setInputData}
        imageHeight="2rem"
      />
      <SectionTitle
        title={t((t) => t.game.ex.name.filterChainedExBuffParam)}
        description={t((t) => t.game.ex.desc.filterChainedExBuffParam)}
      />
      <EnumChecksBox
        options={exBuffParams.chainedExBuffParam}
        inputData={inputData}
        inputKey="filterChainedExBuffParamCode"
        setInputData={setInputData}
        imageHeight="2rem"
      />
    </>
  );
};

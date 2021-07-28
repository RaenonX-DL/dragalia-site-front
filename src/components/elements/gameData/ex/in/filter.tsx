import React from 'react';

import {ElementEnums, ExBuffParams} from '../../../../../api-def/resources';
import {useI18n} from '../../../../../i18n/hook';
import {InputPanel} from '../../../input/main';
import {InputPanelCommonProps} from '../../../input/types';
import {InputData} from './types';
import {overrideInputData} from './utils';


type SectionProps = InputPanelCommonProps<InputData> & {
  elementEnums: ElementEnums,
  exBuffParams: ExBuffParams
}

export const Filter = ({
  inputData,
  setInputData,
  elementEnums,
  exBuffParams,
}: SectionProps) => {
  const {t} = useI18n();

  return (
    <InputPanel
      inputData={inputData}
      setInputData={setInputData}
      inputEntries={[
        {
          type: 'title',
          title: t((t) => t.game.ex.name.filterElement),
          description: t((t) => t.game.ex.desc.filterElement),
        },
        {
          type: 'enumCheckGroup',
          options: elementEnums.elemental,
          getValue: (inputData) => inputData.filter.elements,
          getUpdatedInputData: (newValue) => overrideInputData(inputData, {filter: {elements: newValue}}),
        },
        {
          type: 'title',
          title: t((t) => t.game.ex.name.filterExBuffParam),
          description: t((t) => t.game.ex.desc.filterExBuffParam),
        },
        {
          type: 'enumCheckGroup',
          options: exBuffParams.exBuffParam,
          getValue: (inputData) => inputData.filter.exBuffParams,
          getUpdatedInputData: (newValue) => overrideInputData(inputData, {filter: {exBuffParams: newValue}}),
          imageHeight: '2rem',
        },
        {
          type: 'title',
          title: t((t) => t.game.ex.name.filterChainedExBuffParam),
          description: t((t) => t.game.ex.desc.filterChainedExBuffParam),
        },
        {
          type: 'enumCheckGroup',
          options: exBuffParams.chainedExBuffParam,
          getValue: (inputData) => inputData.filter.cexBuffParams,
          getUpdatedInputData: (newValue) => overrideInputData(inputData, {filter: {cexBuffParams: newValue}}),
          imageHeight: '2rem',
        },
      ]}
    />
  );
};

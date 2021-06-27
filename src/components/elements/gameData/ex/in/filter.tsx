import React from 'react';

import {ElementEnums, ExBuffParams} from '../../../../../api-def/resources';
import {InputPanel} from '../../../input/main';
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
  return (
    <InputPanel
      inputData={inputData}
      setInputData={setInputData}
      inputEntries={[
        {
          type: 'title',
          title: (t) => t.game.ex.name.filterElement,
          description: (t) => t.game.ex.desc.filterElement,
        },
        {
          type: 'enumCheckGroup',
          options: elementEnums.elemental,
          getValue: (inputData) => inputData.filter.elements,
          getUpdatedInputData: (newValue) => overwriteInputData(inputData, {filter: {elements: newValue}}),
        },
        {
          type: 'title',
          title: (t) => t.game.ex.name.filterExBuffParam,
          description: (t) => t.game.ex.desc.filterExBuffParam,
        },
        {
          type: 'enumCheckGroup',
          options: exBuffParams.exBuffParam,
          getValue: (inputData) => inputData.filter.exBuffParams,
          getUpdatedInputData: (newValue) => overwriteInputData(inputData, {filter: {exBuffParams: newValue}}),
          imageHeight: '2rem',
        },
        {
          type: 'title',
          title: (t) => t.game.ex.name.filterChainedExBuffParam,
          description: (t) => t.game.ex.desc.filterChainedExBuffParam,
        },
        {
          type: 'enumCheckGroup',
          options: exBuffParams.chainedExBuffParam,
          getValue: (inputData) => inputData.filter.cexBuffParams,
          getUpdatedInputData: (newValue) => overwriteInputData(inputData, {filter: {cexBuffParams: newValue}}),
          imageHeight: '2rem',
        },
      ]}
    />
  );
};

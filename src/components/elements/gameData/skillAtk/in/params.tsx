import React from 'react';

import Collapse from 'react-bootstrap/Collapse';

import {CategorizedConditionEnums, ElementEnums} from '../../../../../api-def/resources';
import {ResourceLoader} from '../../../../../utils/services/resources/loader';
import {useFetchState} from '../../../common/fetch';
import {InputSectionBaseProps} from '../../props';
import {SectionAtk} from './sections/atk';
import {SectionBuff} from './sections/buff';
import {SectionCrt} from './sections/crt';
import {SectionEx} from './sections/ex';
import {SectionFilter} from './sections/filter';
import {SectionOther} from './sections/other';
import {SectionPunisher} from './sections/punisher';
import {SectionSkill} from './sections/skill';
import {SectionTarget} from './sections/target';
import {InputData} from './types';


type InputParametersProps = InputSectionBaseProps<InputData> & {
  collapsed: boolean
}

export const InputParameters = ({collapsed, inputData, setInputData}: InputParametersProps) => {
  const {
    fetchStatus: conditionEnums,
    fetchFunction: fetchConditionEnums,
  } = useFetchState<CategorizedConditionEnums>(
    {
      afflictions: [],
      elements: [],
    },
    ResourceLoader.getEnumCategorizedConditions,
    'Failed to fetch the condition enums.',
  );

  const {
    fetchStatus: elemEnums,
    fetchFunction: fetchElemEnums,
  } = useFetchState<ElementEnums>(
    {
      elemental: [],
    },
    ResourceLoader.getEnumElements,
    'Failed to fetch the element enums.',
  );

  fetchConditionEnums();
  fetchElemEnums();

  return (
    <>
      <Collapse in={!collapsed}>
        <div>
          <SectionAtk inputData={inputData} setInputData={setInputData}/>
          <hr/>
          <SectionBuff inputData={inputData} setInputData={setInputData}/>
          <hr/>
          <SectionEx inputData={inputData} setInputData={setInputData}/>
          <hr/>
          <SectionCrt inputData={inputData} setInputData={setInputData}/>
          <hr/>
          <SectionSkill inputData={inputData} setInputData={setInputData}/>
          <hr/>
          <SectionPunisher inputData={inputData} setInputData={setInputData}/>
          <hr/>
          <SectionOther inputData={inputData} setInputData={setInputData}/>
          <hr/>
        </div>
      </Collapse>
      <SectionTarget
        inputData={inputData}
        setInputData={setInputData}
        conditionEnums={conditionEnums.data}
      />
      <hr/>
      <SectionFilter
        inputData={inputData}
        setInputData={setInputData}
        conditionEnums={conditionEnums.data}
        elementEnums={elemEnums.data}
      />
    </>
  );
};

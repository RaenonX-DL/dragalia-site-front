import React from 'react';

import Collapse from 'react-bootstrap/Collapse';

import {CategorizedConditionEnums} from '../../../../../api-def/resources';
import {InputPanelCommonProps} from '../../../../elements/input/panel/types';
import {SectionAtk} from './sections/atk';
import {SectionBuff} from './sections/buff';
import {SectionCrt} from './sections/crt';
import {SectionDragon} from './sections/dragon';
import {SectionEx} from './sections/ex';
import {SectionOther} from './sections/other';
import {SectionPunisher} from './sections/punisher';
import {SectionSkill} from './sections/skill';
import {SectionTarget} from './sections/target';
import {InputSummary} from './summary';
import {InputData} from './types';


type InputParametersProps = InputPanelCommonProps<InputData> & {
  collapsed: boolean,
  conditionEnums: CategorizedConditionEnums,
};

export const InputParameters = ({collapsed, inputData, setInputData, conditionEnums}: InputParametersProps) => {
  // <div> is required for collapse to work
  return (
    <>
      <Collapse in={collapsed}>
        <div>
          <InputSummary inputData={inputData} conditionEnums={conditionEnums}/>
        </div>
      </Collapse>
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
          <SectionDragon inputData={inputData} setInputData={setInputData}/>
          <hr/>
          <SectionOther inputData={inputData} setInputData={setInputData}/>
          <hr/>
          <SectionTarget inputData={inputData} setInputData={setInputData} conditionEnums={conditionEnums}/>
        </div>
      </Collapse>
    </>
  );
};

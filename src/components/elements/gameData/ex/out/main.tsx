import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {CharaExAbilityDataEntry, ConditionEnumMap} from '../../../../../api-def/resources';
import {overLengthWarningCheck} from '../../utils';
import {InputData} from '../in/types';
import {ExAbilityEntry} from './entry';
import {filterExAbilityData} from './utils';


export type OutputProps = {
  exAbilityData: Array<CharaExAbilityDataEntry>,
  conditionEnums: ConditionEnumMap,
  inputData?: InputData,
}


export const ExAbilityOutput = ({exAbilityData, conditionEnums, inputData}: OutputProps) => {
  // Early termination if no input data
  if (!inputData) {
    return <></>;
  }

  exAbilityData = filterExAbilityData(exAbilityData, inputData);

  const entries: Array<React.ReactElement> = [];

  // Check over-length
  const warning = overLengthWarningCheck(exAbilityData);
  if (warning !== null) {
    entries.push(<Col lg={12}>{warning}</Col>);
  }

  // Add transformed entries
  entries
    .push(
      ...exAbilityData
        .map((exAbilityData: CharaExAbilityDataEntry, index: number) => (
          <Col key={index} lg={6}>
            <ExAbilityEntry entry={exAbilityData} conditionEnums={conditionEnums}/>
          </Col>
        )),
    );

  return <Row>{entries}</Row>;
};

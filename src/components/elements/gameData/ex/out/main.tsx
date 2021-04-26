import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {ConditionEnumMap} from '../../../../../utils/services/resources/types/enums';
import {ExAbilityDataEntry} from '../../../../../utils/services/resources/types/ex';
import {overLengthWarningCheck} from '../../utils';
import {InputData} from '../in/types';
import {ExAbilityEntry} from './entry';
import {filterExAbilityData} from './utils';


export type OutputProps = {
  exAbilityData: Array<ExAbilityDataEntry>,
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
    entries.push(warning);
  }

  // Add transformed entries
  entries
    .push(
      ...exAbilityData
        .map((exAbilityData: ExAbilityDataEntry, index: number) => (
          <Col key={index} lg={6}>
            <ExAbilityEntry entry={exAbilityData} conditionEnums={conditionEnums}/>
          </Col>
        )),
    );

  return <Row>{entries}</Row>;
};

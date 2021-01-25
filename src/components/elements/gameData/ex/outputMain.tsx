import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {ConditionEnumMap} from '../../../../utils/services/resources/types/enums';
import {ExAbilityDataEntry} from '../../../../utils/services/resources/types/ex';
import {overLengthWarningCheck} from '../utils';
import {InputData} from './inputSection';
import {ExAbilityEntry} from './outputEntry';


export type OutputProps = {
  exAbilityData: Array<ExAbilityDataEntry>,
  conditionEnums: ConditionEnumMap,
  inputData?: InputData,
}


export const filterExAbilityData = (exAbilityData: Array<ExAbilityDataEntry>, inputData: InputData) => {
  return exAbilityData.filter((entry) => {
    if (inputData.filterElementCode.length > 0 && !inputData.filterElementCode.includes(entry.chara.element)) {
      return false;
    }

    if (
      inputData.filterExBuffParamCode.length > 0 &&
      !entry.ex.some((exEffect) => {
        return inputData.filterExBuffParamCode.includes(exEffect.parameter.code);
      })
    ) {
      return false;
    }

    return inputData.filterChainedExBuffParamCode.length == 0 ||
      entry.chainedEx.some((chainedExEffect) => {
        return inputData.filterChainedExBuffParamCode.includes(chainedExEffect.parameter.code);
      });
  });
};

export const ExAbilityOutput = ({exAbilityData, conditionEnums, inputData}: OutputProps) => {
  // region Early termination if no input data
  if (!inputData) {
    return <></>;
  }
  // endregion

  // region Filter entries
  exAbilityData = filterExAbilityData(exAbilityData, inputData);
  // endregion

  const entries: Array<React.ReactElement> = [];

  // region Check over-length
  const warning = overLengthWarningCheck(exAbilityData);
  if (warning !== null) {
    entries.push(warning);
  }
  // endregion

  // Add transformed entries
  entries
    .push(
      ...exAbilityData
        .map((exAbilityData: ExAbilityDataEntry, index: number) => (
          <Col key={index} xs={6}>
            <ExAbilityEntry entry={exAbilityData} conditionEnums={conditionEnums}/>
          </Col>
        )),
    );

  return <Row>{entries}</Row>;
};

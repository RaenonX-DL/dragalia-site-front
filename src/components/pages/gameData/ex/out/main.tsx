import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';

import {CharaExAbilityDataEntry, ConditionEnumMap} from '../../../../../api-def/resources';
import {useI18n} from '../../../../../i18n/hook';
import {RowTight} from '../../../../elements/common/grid/row';
import {overLengthWarningCheck} from '../../../../elements/gameData/warnings/overLength';
import {InputData} from '../in/types';
import {ExAbilityEntry} from './entry';
import {filterExAbilityData} from './utils';


export type OutputProps = {
  exAbilityData: Array<CharaExAbilityDataEntry>,
  conditionEnums: ConditionEnumMap,
  inputData?: InputData,
};


export const ExAbilityOutput = ({exAbilityData, conditionEnums, inputData}: OutputProps) => {
  const {t} = useI18n();

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
            <ExAbilityEntry
              {...exAbilityData}
              conditionEnums={conditionEnums}
            />
          </Col>
        )),
    );

  if (!entries.length) {
    return (
      <Alert variant="danger">
        {t((t) => t.misc.noResult)}
      </Alert>
    );
  }

  return <RowTight>{entries}</RowTight>;
};

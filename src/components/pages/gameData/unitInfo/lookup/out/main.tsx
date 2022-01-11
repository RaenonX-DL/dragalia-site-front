import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';

import {UnitInfoLookupAnalyses} from '../../../../../../api-def/api';
import {useI18n} from '../../../../../../i18n/hook';
import {RowTight} from '../../../../../elements/common/grid/row';
import {UnitSearchOutputProps} from '../../../../../elements/gameData/unit/searcher/types';
import {InputData, SortOrder} from '../in/types';
import styles from '../main.module.css';
import {UnitInfoEntry} from './entry/main';


type AnalysisLookupOutputProps = UnitSearchOutputProps<SortOrder, InputData> & {
  analyses: UnitInfoLookupAnalyses,
};

export const UnitInfoLookupOutput = ({
  prioritizedUnitInfo,
  otherUnitInfo,
  analyses,
  inputData,
}: AnalysisLookupOutputProps) => {
  const {t} = useI18n();

  // Split to prioritize the units that have analysis
  const unitInfoHasAnalysis = prioritizedUnitInfo
    .map((info) => ({unitInfo: info, lookupInfo: analyses[info.id]}));
  const unitInfoNoAnalysis = otherUnitInfo
    .map((info) => ({unitInfo: info, lookupInfo: undefined}));
  const unitInfoSorted = [...unitInfoHasAnalysis, ...unitInfoNoAnalysis];

  if (!unitInfoSorted.length) {
    return (
      <Alert variant="danger">
        {t((t) => t.misc.noResult)}
      </Alert>
    );
  }

  return (
    <RowTight className="mb-2">
      {unitInfoSorted.map((info) => (
        <Col
          key={info.unitInfo.id}
          className={inputData.iconOnly ? styles['icon-only-entry'] : styles['complete-entry']}
        >
          <UnitInfoEntry
            unitInfo={info.unitInfo}
            analysisMeta={info.lookupInfo}
            iconOnly={inputData.iconOnly}
          />
        </Col>
      ))}
    </RowTight>
  );
};

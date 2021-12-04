import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import {UnitInfoLookupAnalyses} from '../../../../../../api-def/api';
import {useI18n} from '../../../../../../i18n/hook';
import {UnitSearchOutputProps} from '../../../../../elements/gameData/unit/searcher/types';
import {InputData, SortOrder} from '../in/types';
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
      <h5 className="text-danger text-center">
        {t((t) => t.misc.noResult)}
      </h5>
    );
  }

  return (
    <Form.Row>
      {unitInfoSorted.map((info) => (
        <Col key={info.unitInfo.id} md={inputData.iconOnly ? 2 : 6} className="mb-2">
          <UnitInfoEntry
            unitInfo={info.unitInfo}
            analysisMeta={info.lookupInfo}
            iconOnly={inputData.iconOnly}
          />
        </Col>
      ))}
    </Form.Row>
  );
};

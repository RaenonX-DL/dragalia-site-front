import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {AnalysisLookupEntry} from '../../../../../../api-def/api';
import {UnitInfoData} from '../../../../../../api-def/resources';
import {UnitIcon} from '../../../../gameData/unitIcon';
import {AnalysisEntryAvailable} from './entryAvailable';
import {AnalysisEntryUnavailable} from './entryUnavailable';

export type AnalysisEntryCommonProps = {
  unitInfo: UnitInfoData,
}

type AnalysisEntryProps = AnalysisEntryCommonProps & {
  analysisMeta?: AnalysisLookupEntry,
  isFetchingMeta: boolean,
}

export const AnalysisEntry = ({unitInfo, analysisMeta, isFetchingMeta}: AnalysisEntryProps) => {
  return (
    <Row noGutters className="rounded bg-black-32 p-2">
      <Col xs="auto" className="mr-2">
        <UnitIcon unitInfo={unitInfo} className="ml-1" style={{height: '4rem'}}/>
      </Col>
      <Col>
        {
          analysisMeta ?
            <AnalysisEntryAvailable unitInfo={unitInfo} analysisMeta={analysisMeta}/> :
            <AnalysisEntryUnavailable unitInfo={unitInfo} isFetchingMeta={isFetchingMeta}/>
        }
      </Col>
    </Row>
  );
};

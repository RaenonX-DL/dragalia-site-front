import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {UnitInfoLookupEntry} from '../../../../../../api-def/api';
import {UnitInfoData} from '../../../../../../api-def/resources';
import {UnitIcon} from '../../../unitIcon';
import {EntryWithAnalysis, EntryWithAnalysisProps} from './entryHasAnalysis';
import {EntryNoAnalysis} from './entryNoAnalysis';


export type EntryCommonProps = {
  unitInfo: UnitInfoData,
}

type AnalysisEntryProps = EntryCommonProps & Omit<EntryWithAnalysisProps, 'analysisMeta'> & {
  analysisMeta?: UnitInfoLookupEntry,
  isFetchingMeta: boolean,
}

export const UnitInfoEntry = ({unitInfo, analysisMeta, isFetchingMeta, simplified}: AnalysisEntryProps) => {
  return (
    <Row noGutters className="rounded bg-black-32 p-2">
      <Col xs="auto" className="mr-2">
        <UnitIcon unitInfo={unitInfo} className="ml-1" style={{height: '4rem'}}/>
      </Col>
      <Col>
        {
          analysisMeta ?
            <EntryWithAnalysis unitInfo={unitInfo} analysisMeta={analysisMeta} simplified={simplified}/> :
            <EntryNoAnalysis unitInfo={unitInfo} isFetchingMeta={isFetchingMeta}/>
        }
      </Col>
    </Row>
  );
};

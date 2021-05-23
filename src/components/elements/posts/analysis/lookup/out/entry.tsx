import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {useI18n} from '../../../../../../i18n/hook';
import {UnitInfo} from '../types';
import {getImageURL} from '../utils';
import {AnalysisEntryAvailable} from './entryAvailable';
import {AnalysisEntryUnavailable} from './entryUnavailable';
import {AnalysisLookupEntry} from './main';

export type AnalysisEntryCommonProps = {
  unitInfo: UnitInfo,
}

type AnalysisEntryProps = AnalysisEntryCommonProps & {
  analysisMeta?: AnalysisLookupEntry,
  isFetchingMeta: boolean,
}

export const AnalysisEntry = ({unitInfo, analysisMeta, isFetchingMeta}: AnalysisEntryProps) => {
  const {lang} = useI18n();

  return (
    <Row noGutters className="rounded bg-black-32 p-2">
      <Col xs="auto" className="mr-2">
        <img
          alt={unitInfo.name[lang]}
          src={getImageURL(unitInfo)}
          style={{height: '4rem'}}
        />
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

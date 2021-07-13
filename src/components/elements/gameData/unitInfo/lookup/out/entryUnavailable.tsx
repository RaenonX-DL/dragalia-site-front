import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useI18n} from '../../../../../../i18n/hook';
import {AnalysisEntryCommonProps} from './entry';


type AnalysisEntryUnavailableProps = AnalysisEntryCommonProps & {
  isFetchingMeta: boolean
}

export const AnalysisEntryUnavailable = ({unitInfo, isFetchingMeta}: AnalysisEntryUnavailableProps) => {
  const {t, lang} = useI18n();

  return (
    <>
      <Row noGutters className="pt-1" style={{height: '2.5rem'}}>
        <Col className="mr-2">
          <span className="h6 text-muted">{unitInfo.name[lang]}</span>
        </Col>
      </Row>
      <Row noGutters className="align-items-center" style={{height: '1.5rem'}}>
        {
          isFetchingMeta ?
            <Col className="text-muted text-center">
              {t((t) => t.message.info.fetching)}
            </Col> :
            <Col className="text-danger text-center">
              {t((t) => t.posts.analysis.error.unavailable)}
            </Col>
        }
      </Row>
    </>
  );
};

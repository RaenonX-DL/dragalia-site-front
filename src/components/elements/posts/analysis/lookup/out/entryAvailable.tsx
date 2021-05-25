import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {AnalysisLookupEntry} from '../../../../../../api-def/api';
import {useI18n} from '../../../../../../i18n/hook';
import {TimeAgo} from '../../../../../../utils/timeago';
import {AnalysisEntryCommonProps} from './entry';

type AnalysisEntryAvailableProps = AnalysisEntryCommonProps & {
  analysisMeta: AnalysisLookupEntry,
}

export const AnalysisEntryAvailable = ({unitInfo, analysisMeta}: AnalysisEntryAvailableProps) => {
  const {t, lang} = useI18n();

  return (
    <>
      <Row noGutters className="pt-1" style={{height: '2.5rem'}}>
        <Col className="mr-2">
          <a className="h6">{unitInfo.name[lang]}</a>
        </Col>
        <Col xs="auto" className="text-right text-muted">
          <small>
            {t(
              (t) => t.posts.info.viewCount,
              {count: analysisMeta.viewCount.toString()},
            )}
          </small>
        </Col>
      </Row>
      <Row noGutters className="small align-items-center" style={{height: '1.5rem'}}>
        <Col className="text-center">
          {t((t) => t.posts.info.lastModified)}:&nbsp;
          <TimeAgo epoch={analysisMeta.modifiedEpoch}/>
        </Col>
        <Col className="text-center d-none d-lg-block">
          {t((t) => t.posts.info.published)}:&nbsp;
          <TimeAgo epoch={analysisMeta.publishedEpoch}/>
        </Col>
      </Row>
    </>
  );
};

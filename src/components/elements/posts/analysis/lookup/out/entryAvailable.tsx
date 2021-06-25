import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {AnalysisLookupEntry} from '../../../../../../api-def/api';
import {PostPath} from '../../../../../../const/path/definitions';
import {useI18n} from '../../../../../../i18n/hook';
import {makePostPath} from '../../../../../../utils/path/make';
import {TimeAgo} from '../../../../../../utils/timeago';
import {AnalysisEntryCommonProps} from './entry';

export type AnalysisEntryAvailableProps = AnalysisEntryCommonProps & {
  analysisMeta: AnalysisLookupEntry,
  simplified?: boolean,
}

export const AnalysisEntryAvailable = ({
  unitInfo,
  analysisMeta,
  simplified = false,
}: AnalysisEntryAvailableProps) => {
  const {t, lang} = useI18n();

  return (
    <>
      <Row noGutters className="pt-1" style={{height: '2.5rem'}}>
        <Col className="mr-2">
          <a
            className="h6"
            href={makePostPath(PostPath.ANALYSIS, {pid: unitInfo.id, lang})}
          >
            {unitInfo.name[lang]}
          </a>
        </Col>
        {
          !simplified &&
          <Col xs="auto" className="text-right text-muted">
            <small>
              {t(
                (t) => t.posts.info.viewCountComplete,
                {count: analysisMeta.viewCount.toString()},
              )}
            </small>
          </Col>
        }
      </Row>
      <Row noGutters className="small align-items-center" style={{height: '1.5rem'}}>
        <Col className="text-center">
          {t((t) => t.posts.info.lastModified)}&nbsp;
          <TimeAgo epoch={analysisMeta.modifiedEpoch}/>
        </Col>
        {
          !simplified &&
          <Col className="text-center d-none d-lg-block">
            {t((t) => t.posts.info.published)}&nbsp;
            <TimeAgo epoch={analysisMeta.publishedEpoch}/>
          </Col>
        }
      </Row>
    </>
  );
};

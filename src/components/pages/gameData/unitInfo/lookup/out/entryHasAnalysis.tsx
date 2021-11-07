import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {UnitInfoLookupEntry} from '../../../../../../api-def/api';
import {useI18n} from '../../../../../../i18n/hook';
import {TimeAgo} from '../../../../../../utils/timeago';
import {UnitLink} from '../../../../../elements/gameData/unit/link';
import {EntryCommonProps} from './entry';


export type EntryWithAnalysisProps = EntryCommonProps & {
  analysisMeta: UnitInfoLookupEntry,
  simplified?: boolean,
};

export const EntryWithAnalysis = ({
  unitInfo,
  analysisMeta,
  simplified = false,
}: EntryWithAnalysisProps) => {
  const {t, lang} = useI18n();

  return (
    <>
      <Row noGutters className="pt-1" style={{height: '2.5rem'}}>
        <Col className="mr-2">
          <UnitLink className="h6" unit={{id: unitInfo.id, name: unitInfo.name[lang]}} hasAnalysis/>
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
          {t((t) => t.misc.timestamp.lastModified)}&nbsp;
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

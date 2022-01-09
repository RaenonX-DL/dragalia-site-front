import React from 'react';

import Col from 'react-bootstrap/Col';

import {useI18n} from '../../../../../../../../i18n/hook';
import {TimeAgo} from '../../../../../../../../utils/timeago';
import {RowNoGutter} from '../../../../../../../elements/common/grid/row';
import {UnitLink} from '../../../../../../../elements/gameData/unit/link';
import {EntryPropsHasAnalysis} from '../types';


export const CompleteEntryWithAnalysis = ({
  unitInfo,
  analysisMeta,
  simplified = false,
}: EntryPropsHasAnalysis) => {
  const {t, lang} = useI18n();

  return (
    <>
      <RowNoGutter className="pt-1" style={{height: '2.5rem'}}>
        <Col>
          <UnitLink className="h6" unit={{id: unitInfo.id, name: unitInfo.name[lang]}} hasAnalysis/>
        </Col>
        {
          !simplified &&
          <Col xs="auto" className="text-muted">
            <small>
              {t(
                (t) => t.posts.info.viewCountComplete,
                {count: analysisMeta.viewCount.toString()},
              )}
            </small>
          </Col>
        }
      </RowNoGutter>
      <RowNoGutter className="small align-items-center" style={{height: '1.5rem'}}>
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
      </RowNoGutter>
    </>
  );
};

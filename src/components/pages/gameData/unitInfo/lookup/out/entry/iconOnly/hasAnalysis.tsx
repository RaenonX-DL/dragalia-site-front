import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useI18n} from '../../../../../../../../i18n/hook';
import {TimeAgo} from '../../../../../../../../utils/timeago';
import {IconEdit, IconPublish} from '../../../../../../../elements/common/icons';
import {UnitIconClickable} from '../../../../../../../elements/gameData/unit/iconClickable';
import {EntryPropsHasAnalysis} from '../types';


export const IconOnlyEntryWithAnalysis = ({
  unitInfo,
  analysisMeta,
}: EntryPropsHasAnalysis) => {
  const {t, lang} = useI18n();

  return (
    <>
      <Row noGutters className="pt-1 text-center">
        <Col>
          <UnitIconClickable
            unit={{
              id: unitInfo.id,
              name: unitInfo.name[lang],
              icon: {
                type: unitInfo.type,
                name: unitInfo.iconName,
              },
            }}
            hasAnalysis
            style={{height: '4.5rem'}}
          />
        </Col>
      </Row>
      <Row className="small">
        <Col className="text-right text-muted">
          {t(
            (t) => t.posts.info.viewCountComplete,
            {count: analysisMeta.viewCount.toString()},
          )}
        </Col>
      </Row>
      <Row className="small">
        <Col className="text-center">
          <IconEdit/>&nbsp;
          <TimeAgo epoch={analysisMeta.modifiedEpoch}/>
        </Col>
      </Row>
      <Row className="small">
        <Col className="text-center">
          <IconPublish/>&nbsp;
          <TimeAgo epoch={analysisMeta.publishedEpoch}/>
        </Col>
      </Row>
    </>
  );
};

import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {TimeAgo} from '../../../../../../../../utils/timeago';
import {RowNoGutter} from '../../../../../../../elements/common/grid/row';
import {IconEdit, IconPublish, IconView} from '../../../../../../../elements/common/icons';
import {UnitIconClickable} from '../../../../../../../elements/gameData/unit/iconClickable';
import styles from '../../../main.module.css';
import {EntryPropsHasAnalysis} from '../types';


export const IconOnlyEntryWithAnalysis = ({
  unitInfo,
  analysisMeta,
}: EntryPropsHasAnalysis) => {
  return (
    <>
      <RowNoGutter className="pt-1 text-center">
        <Col>
          <UnitIconClickable
            unit={unitInfo}
            hasAnalysis
            className={styles['unit-icon']}
          />
        </Col>
      </RowNoGutter>
      <Row className="small">
        <Col className="text-end text-muted">
          <IconView/>&nbsp;
          {analysisMeta.viewCount.toString()}
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

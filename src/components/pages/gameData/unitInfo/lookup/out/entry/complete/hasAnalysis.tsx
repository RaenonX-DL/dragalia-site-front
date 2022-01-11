import React from 'react';

import Col from 'react-bootstrap/Col';

import {useI18n} from '../../../../../../../../i18n/hook';
import {TimeAgo} from '../../../../../../../../utils/timeago';
import {RowNoGutter} from '../../../../../../../elements/common/grid/row';
import {IconEdit, IconPublish, IconView} from '../../../../../../../elements/common/icons';
import {UnitLink} from '../../../../../../../elements/gameData/unit/link';
import styles from '../../../main.module.css';
import {EntryPropsHasAnalysis} from '../types';


export const CompleteEntryWithAnalysis = ({
  unitInfo,
  analysisMeta,
  simplified = false,
}: EntryPropsHasAnalysis) => {
  const {lang} = useI18n();

  return (
    <>
      <RowNoGutter className={styles['info-top']}>
        <Col>
          <UnitLink className="h6" unit={{id: unitInfo.id, name: unitInfo.name[lang]}} hasAnalysis/>
        </Col>
        <Col xs="auto" className="text-muted">
          <small>
            <IconView/>&nbsp;
            {analysisMeta.viewCount.toString()}
          </small>
        </Col>
      </RowNoGutter>
      <RowNoGutter className={styles['info-bottom']}>
        <Col className="text-center">
          <IconEdit/>&nbsp;
          <TimeAgo epoch={analysisMeta.modifiedEpoch}/>
        </Col>
        {
          !simplified &&
          <Col>
            <IconPublish/>&nbsp;
            <TimeAgo epoch={analysisMeta.publishedEpoch}/>
          </Col>
        }
      </RowNoGutter>
    </>
  );
};

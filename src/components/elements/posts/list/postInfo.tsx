import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PostInfo} from '../../../../api-def/api';
import {useI18n} from '../../../../i18n/hook';
import {TimeAgo} from '../../../../utils/timeago';
import {IconEdit, IconPublish} from '../../common/icons';
import styles from './entry.module.css';


type Props<E extends PostInfo> = {
  entry: E,
  className?: string,
};

export const PostEntryInfoBar = <E extends PostInfo>({entry, className}: Props<E>) => {
  const {t} = useI18n();

  return (
    <Row noGutters className={className}>
      <Col>
        <small className={styles.timestamp}>
          <IconEdit/>&nbsp;<TimeAgo epoch={entry.modifiedEpoch}/>
        </small>
        <small className={styles.timestamp}>
          <IconPublish/>&nbsp;<TimeAgo epoch={entry.publishedEpoch}/>
        </small>
      </Col>
      <Col xs="auto" className="text-right">
        <small className="text-muted">
          {t((t) => t.posts.info.viewCountComplete, {count: entry.viewCount.toString()})}
        </small>
      </Col>
    </Row>
  );
};

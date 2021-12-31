import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PostInfo} from '../../../../api-def/api';
import {useI18n} from '../../../../i18n/hook';
import {TimeAgo} from '../../../../utils/timeago';
import {IconEdit, IconPublish} from '../../common/icons';
import {InternalLink} from '../../common/link/internal';
import styles from './entry.module.css';
import {FunctionRenderPostBadge} from './types';


type Props<E extends PostInfo> = {
  entry: E,
  getLink: (entry: E) => string,
  getTitle: (entry: E) => string,
  renderPostBadge: FunctionRenderPostBadge<E>,
};

export const PostEntry = <E extends PostInfo>({
  entry,
  getLink,
  getTitle,
  renderPostBadge,
}: Props<E>) => {
  const {t, lang} = useI18n();

  return (
    <div className={styles.entry}>
      <h5>
        <InternalLink
          href={getLink(entry)}
          locale={lang}
          content={getTitle(entry)}
        />
      </h5>
      <Row noGutters>
        <Col xs="auto">
          {renderPostBadge({entry})}&nbsp;
        </Col>
        <Col>
          <small className={styles.timestamp}>
            <IconEdit/>&nbsp;<TimeAgo epoch={entry.modifiedEpoch}/>
          </small>
          <small className={styles.timestamp}>
            <IconPublish/>&nbsp;<TimeAgo epoch={entry.publishedEpoch}/>
          </small>
        </Col>
        <Col className="text-right">
          <small className="text-muted">
            {t((t) => t.posts.info.viewCountComplete, {count: entry.viewCount.toString()})}
          </small>
        </Col>
      </Row>
    </div>
  );
};

import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {SequencedPostInfo} from '../../../../api-def/api';
import {useI18n} from '../../../../i18n/hook';
import {TimeAgo} from '../../../../utils/timeago';
import {IconEdit, IconPublish} from '../../common/icons';
import {InternalLink} from '../../common/link/internal';
import styles from './entry.module.css';


export type LinkGenerator = (postId: number) => string;

export type PostEntryBadgeProps<E extends SequencedPostInfo> = {
  entry: E,
}

export type PostEntryProps<E extends SequencedPostInfo> = {
  generateLink: LinkGenerator,
  renderPostBadge: (badgeProps: PostEntryBadgeProps<E>) => React.ReactElement,
};

type PostEntryPropsInternal<E extends SequencedPostInfo> = PostEntryProps<E> & {
  entry: E,
};

export const PostEntry = <E extends SequencedPostInfo>({
  entry,
  generateLink,
  renderPostBadge,
}: PostEntryPropsInternal<E>) => {
  const {t, lang} = useI18n();

  return (
    <div className={styles.entry}>
      <h5>
        <InternalLink
          href={generateLink(entry.seqId)}
          locale={lang}
          content={entry.title}
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

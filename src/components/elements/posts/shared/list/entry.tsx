import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {SequencedPostInfo} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {TimeAgo} from '../../../../../utils/timeago';


export type LinkGenerator = (postId: number) => string;

export type PostEntryBadgesProps<E extends SequencedPostInfo> = {
  entry: E,
}

export type PostEntryProps<E extends SequencedPostInfo> = {
  generateLink: LinkGenerator,
  renderPostBadges: (badgesProps: PostEntryBadgesProps<E>) => React.ReactElement,
};

type PostEntryPropsInternal<E extends SequencedPostInfo> = PostEntryProps<E> & {
  entry: E,
};

export const PostEntry = <E extends SequencedPostInfo>({
  entry,
  generateLink,
  renderPostBadges,
}: PostEntryPropsInternal<E>) => {
  const {t} = useI18n();

  return (
    <div className="rounded bg-black-32 p-3">
      <Row>
        <Col>
          {renderPostBadges({entry})}
        </Col>
        <Col className="text-right">
          <span className="h6 text-muted">
            {t((t) => t.posts.info.viewCountComplete, {count: entry.viewCount.toString()})}
          </span>
        </Col>
      </Row>
      <Row>
        <Col><h5><a href={generateLink(entry.seqId)}>{entry.title}</a></h5></Col>
      </Row>
      <Row>
        <Col lg={6} className="text-center">
          {t((t) => t.posts.info.lastModified)}:&nbsp;<TimeAgo epoch={entry.modifiedEpoch}/>
        </Col>
        <Col lg={6} className="text-center">
          {t((t) => t.posts.info.published)}:&nbsp;<TimeAgo epoch={entry.publishedEpoch}/>
        </Col>
      </Row>
    </div>
  );
};

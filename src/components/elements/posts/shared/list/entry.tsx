import React from 'react';

import {Card, Col, Row} from 'react-bootstrap';

import {PostListEntry} from '../../../../../api-def/api';
import {useTranslation} from '../../../../../i18n/utils';
import {TimeAgo} from '../../../../../utils/timeago';


export type LinkGenerator = (postId: number) => string;

export type PostEntryBadgesProps<E extends PostListEntry> = {
  entry: E,
}

export type PostEntryProps<E extends PostListEntry> = {
  generateLink: LinkGenerator,
  renderPostBadges: (badgesProps: PostEntryBadgesProps<E>) => React.ReactNode,
};

type PostEntryPropsInternal<E extends PostListEntry> = PostEntryProps<E> & {
  entry: E,
};

export const PostEntry = <E extends PostListEntry>({
  entry,
  generateLink,
  renderPostBadges,
}: PostEntryPropsInternal<E>) => {
  const {t} = useTranslation();

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col className="mb-2">
            {renderPostBadges({entry})}
          </Col>
          <Col className="text-right">
            {t('posts.info.view_count')}:&nbsp;<span className="h4"><code>{entry.viewCount}</code></span>
          </Col>
        </Row>
        <Row>
          <Col><h5><a href={generateLink(entry.seqId)}>{entry.title}</a></h5></Col>
        </Row>
        <Row>
          <Col lg={6} className="text-center">
            {t('posts.info.last_modified')}:&nbsp;<TimeAgo epoch={entry.modifiedEpoch}/>
          </Col>
          <Col lg={6} className="text-center">
            {t('posts.info.published')}:&nbsp;<TimeAgo epoch={entry.publishedEpoch}/>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

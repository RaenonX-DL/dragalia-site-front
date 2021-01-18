import React from 'react';
import {Badge, Card, Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';

import {QuestPostListEntry} from '../../../../utils/services/api';


type linkGenerator = (id: number | string) => string;


type PostEntryProps = {
  post: QuestPostListEntry,
  linkGenerator: linkGenerator
};


const PostEntry = ({post, linkGenerator}: PostEntryProps) => {
  const {t} = useTranslation();

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col><h4><Badge variant="primary">#{post.seqId}</Badge></h4></Col>
          <Col className="text-right">
            {t('posts.info.view_count')}:&nbsp;<span className="h4"><code>{post.viewCount}</code></span>
          </Col>
        </Row>
        <Row>
          <Col><h5><a href={linkGenerator(post.seqId)}>{post.title}</a></h5></Col>
        </Row>
        <Row>
          <Col lg={6} className="text-center">
            {t('posts.info.last_modified', {datetime: post.modified})}
          </Col>
          <Col lg={6} className="text-center">
            {t('posts.info.published', {datetime: post.published})}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};


type PostListProps = {
  posts: Array<QuestPostListEntry>,
  linkGenerator: linkGenerator
};


export const QuestPostList = ({posts, linkGenerator}: PostListProps) => {
  return (
    <Row>
      {
        posts.map((post) => {
          return (
            <Col lg={12} key={post.seqId.toString() + post.lang} className="mb-3">
              <PostEntry post={post} linkGenerator={linkGenerator}/>
            </Col>
          );
        })
      }
    </Row>
  );
};

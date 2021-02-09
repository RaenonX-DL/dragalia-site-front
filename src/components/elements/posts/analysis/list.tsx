import React from 'react';
import {Badge, Card, Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {AnalysisListEntry, AnalysisType} from '../../../../api-def/api';


type linkGenerator = (id: number | string) => string;


type PostEntryProps = {
  post: AnalysisListEntry,
  linkGenerator: linkGenerator
};


const getPostTypeName = (type: AnalysisType) => {
  const {t} = useTranslation();

  if (type === AnalysisType.CHARACTER) {
    return t('posts.analysis.type.character');
  } else if (type === AnalysisType.DRAGON) {
    return t('posts.analysis.type.dragon');
  } else {
    return t('posts.analysis.type.uncategorized');
  }
};


const PostEntry = ({post, linkGenerator}: PostEntryProps) => {
  const {t} = useTranslation();

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col className="mb-2">
            <span className="h4"><Badge variant="success">{getPostTypeName(post.type)}</Badge></span>&nbsp;
            <span className="h4"><Badge variant="success">#{post.seqId}</Badge></span>
          </Col>
          <Col className="text-right">
            {t('posts.info.view_count')}:&nbsp;<span className="h4"><code>{post.viewCount}</code></span>
          </Col>
        </Row>
        <Row>
          <Col><h5><a href={linkGenerator(post.seqId)}>{post.unitName}</a></h5></Col>
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
  posts: Array<AnalysisListEntry>,
  linkGenerator: linkGenerator
};


export const AnalysisPostList = ({posts, linkGenerator}: PostListProps) => {
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

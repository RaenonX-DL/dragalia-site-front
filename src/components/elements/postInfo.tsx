import React from 'react';
import {useTranslation} from 'react-i18next';
import {Col, Row} from 'react-bootstrap';

import {InfoCard, PageAnchor, PostModificationNotes} from '../elements';
import {PostGetSuccessResponse} from '../../constants/api';


type PostInfoProps = {
  post: PostGetSuccessResponse,
};


export const PostInfo = ({post}: PostInfoProps) => {
  const {t} = useTranslation();

  return (
    <>
      <PageAnchor name="post-info" type="h3" text={t('posts.info.title_self')} className="mb-3"/>
      <Row>
        <Col lg={4} className="pr-lg-2">
          <InfoCard title={t('posts.info.last_modified')} content={post.modified}/>
          <div className="d-lg-none mb-3"/>
        </Col>
        <Col lg={4} className="px-lg-2">
          <InfoCard title={t('posts.info.published')} content={post.published}/>
          <div className="d-lg-none mb-3"/>
        </Col>
        <Col lg={4} className="pl-lg-2">
          <InfoCard title={t('posts.info.view_count')} content={post.viewCount}/>
          <div className="d-lg-none mb-3"/>
        </Col>
      </Row>
      {
        post.modifyNotes.length > 0 &&
          <Row className="mt-lg-3">
            <Col>
              <PostModificationNotes modifyNote={post.modifyNotes}/>
            </Col>
          </Row>
      }
    </>
  );
};

import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {useTranslation} from '../../../../../i18n/utils';
import {PostGetSuccessResponse} from '../../../../../utils/services/api';
import {TimeAgo} from '../../../../../utils/timeago';
import {InfoCard, PageAnchor, PostEditNotes} from '../../../../elements';


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
          <InfoCard title={t('posts.info.last_modified')} content={<TimeAgo epoch={post.modifiedEpoch}/>}/>
          <div className="d-lg-none mb-3"/>
        </Col>
        <Col lg={4} className="px-lg-2">
          <InfoCard title={t('posts.info.published')} content={<TimeAgo epoch={post.publishedEpoch}/>}/>
          <div className="d-lg-none mb-3"/>
        </Col>
        <Col lg={4} className="pl-lg-2">
          <InfoCard title={t('posts.info.view_count')} content={post.viewCount}/>
          <div className="d-lg-none mb-3"/>
        </Col>
      </Row>
      {
        post.editNotes.length > 0 &&
        <Row className="mt-lg-3">
          <Col>
            <PostEditNotes editNotes={post.editNotes}/>
          </Col>
        </Row>
      }
    </>
  );
};

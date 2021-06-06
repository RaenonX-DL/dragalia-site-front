import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {PostGetResponse} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {TimeAgo} from '../../../../../utils/timeago';
import {PostEditNotes} from './editNotes';
import {InfoCard} from './infoCard';


type PostInfoProps = {
  post: PostGetResponse,
};

export const PostInfo = ({post}: PostInfoProps) => {
  const {t} = useI18n();

  return (
    <>
      <h3 className="mb-3">{t((t) => t.posts.info.titleSelf)}</h3>
      <Row>
        <Col lg={4} className="pr-lg-2">
          <InfoCard
            title={t((t) => t.posts.info.lastModified)}
            content={<TimeAgo epoch={post.modifiedEpoch}/>}
          />
          <div className="d-lg-none mb-3"/>
        </Col>
        <Col lg={4} className="px-lg-2">
          <InfoCard
            title={t((t) => t.posts.info.published)}
            content={<TimeAgo epoch={post.publishedEpoch}/>}
          />
          <div className="d-lg-none mb-3"/>
        </Col>
        <Col lg={4} className="pl-lg-2">
          <InfoCard
            title={t((t) => t.posts.info.viewCount)}
            content={post.viewCount}
          />
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

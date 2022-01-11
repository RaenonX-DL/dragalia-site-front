import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PostGetResponse} from '../../../../api-def/api';
import {useI18n} from '../../../../i18n/hook';
import {TimeAgo} from '../../../../utils/timeago';
import {RowRegular} from '../../common/grid/row';
import {PostEditNotes} from './editNotes';
import {InfoCard} from './infoCard';


type PostInfoProps = {
  post: PostGetResponse,
};

export const PostInfo = ({post}: PostInfoProps) => {
  const {t} = useI18n();

  return (
    <>
      <h3>{t((t) => t.posts.info.titleSelf)}</h3>
      <RowRegular className="mb-3">
        <Col lg={4}>
          <InfoCard
            title={t((t) => t.misc.timestamp.lastModified)}
            content={<TimeAgo epoch={post.modifiedEpoch}/>}
          />
        </Col>
        <Col lg={4}>
          <InfoCard
            title={t((t) => t.posts.info.published)}
            content={<TimeAgo epoch={post.publishedEpoch}/>}
          />
        </Col>
        <Col lg={4}>
          <InfoCard
            title={t((t) => t.posts.info.viewCount)}
            content={post.viewCount}
          />
        </Col>
      </RowRegular>
      {
        post.editNotes.length > 0 &&
        <Row>
          <Col>
            <PostEditNotes editNotes={post.editNotes}/>
          </Col>
        </Row>
      }
    </>
  );
};

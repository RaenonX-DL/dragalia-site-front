import React from 'react';
import {useParams} from 'react-router-dom';
import {Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';

import {InfoCard} from '../elements/infoCard';
import {PostModificationNotes} from '../elements/postModNotes';
import {QuestPositionOutput} from '../elements/questPositionOutput';
import {FetchPost, Markdown, PostManageBar, QuestPostFetchStatus} from '../elements';
import {PageProps} from './base';
import Path from '../../constants/path';


// FIXME: Show that alternate language available

export const QuestPage = ({fnSetTitle}: PageProps) => {
  const {t} = useTranslation();

  const {pid} = useParams();

  const [status, setStatus] = React.useState<QuestPostFetchStatus>(
    {
      fetched: false,
      fetchFailed: false,
      post: null,
      failContent: '',
    },
  );

  fnSetTitle(`#Q${pid} ${status.post ? status.post.title : t('pages.name.quest_post')}`);

  if (status.fetched && status.post) {
    return (
      <>
        {
          status.post.isAdmin ?
            <PostManageBar newPostUrl={Path.QUEST_NEW} editPostUrl={Path.getQuestEdit(status.post.seqId)}/> :
            <></>
        }
        <h3 className="mb-3">{t('posts.quest.general')}</h3>
        <div className="rounded bg-black-32 p-3">
          <Markdown>{status.post.general || 'N/A'}</Markdown>
        </div>

        <hr/>

        <h3 className="mb-3">{t('posts.quest.video')}</h3>
        <div className="rounded bg-black-32 p-3">
          <Markdown>{status.post.video || 'N/A'}</Markdown>
        </div>

        <hr/>

        <h3 className="mb-3">{t('posts.quest.positional')}</h3>
        <QuestPositionOutput info={status.post.info}/>

        <hr/>

        {
          status.post.addendum ?
            <>
              <h3 className="mb-3">{t('posts.quest.addendum')}</h3>
              <div className="rounded bg-black-32 p-3">
                <Markdown>{status.post.addendum}</Markdown>
              </div>
              <hr/>
            </> :
            <></>
        }

        <h3 className="mb-3">{t('posts.info.title_self')}</h3>
        <Row>
          <Col lg={4} className="pr-lg-2">
            <InfoCard title={t('posts.info.last_modified')} content={status.post.modified}/>
            <div className="d-lg-none mb-3"/>
          </Col>
          <Col lg={4} className="px-lg-2">
            <InfoCard title={t('posts.info.published')} content={status.post.published}/>
            <div className="d-lg-none mb-3"/>
          </Col>
          <Col lg={4} className="pl-lg-2">
            <InfoCard title={t('posts.info.view_count')} content={status.post.viewCount}/>
            <div className="d-lg-none mb-3"/>
          </Col>
        </Row>
        {
          status.post.modifyNotes.length > 0 ?
            <Row className="mt-lg-3">
              <Col>
                <PostModificationNotes modifyNote={status.post.modifyNotes}/>
              </Col>
            </Row> :
            <></>
        }
      </>
    );
  } else {
    return <FetchPost status={status} fnSetStatus={setStatus} pid={pid}/>;
  }
};

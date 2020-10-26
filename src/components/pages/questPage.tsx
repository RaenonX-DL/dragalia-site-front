import React from 'react';
import {useParams} from 'react-router-dom';
import {Alert, Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';

import {ApiRequestSender, ApiResponseCodes, QuestPostGetResponse} from '../../constants/api';
import {getGoogleUid} from '../elements/googleSignin';
import {InfoCard} from '../elements/infoCard';
import {QuestPositionOutput} from '../elements/questPositionOutput';
import {Markdown} from '../elements';
import {PageProps} from './base';


// FIXME: [PRIORITY] edit post
// FIXME: Generalize post ID to be the same (possibly the URL too)


type Status = {
  fetched: boolean,
  postContent: QuestPostGetResponse | null,
  fetchFailed: boolean,
  failContent: string
}

export const QuestPage = ({fnSetTitle}: PageProps) => {
  const {t, i18n} = useTranslation();

  const {pid} = useParams();

  const [status, setStatus] = React.useState<Status>(
    {
      fetched: false,
      postContent: null,
      fetchFailed: false,
      failContent: '',
    },
  );

  fnSetTitle(`#${pid} ${status.postContent ? status.postContent.title : t('pages.name.quest_post')}`);

  const fetchPost = () => {
    ApiRequestSender.questPostGet(
      getGoogleUid() || '', pid, i18n.language)
      .then((data) => {
        // setting state triggers re-render, re-render triggers API call,
        // so having a if statement to guard from the re-render and API re-call

        if (!status.fetched) {
          if (data.success) {
            setStatus(
              (prevState) => {
                const newState = {...prevState};

                newState.fetched = true;
                newState.postContent = data;
                newState.fetchFailed = false;
                return newState;
              });
          } else {
            setStatus(
              (prevState) => {
                const newState = {...prevState};

                newState.fetched = true;
                newState.fetchFailed = true;
                newState.failContent =
                  data.code === ApiResponseCodes.FAILED_POST_NOT_EXISTS ?
                    t('posts.manage.post_not_exists') :
                    data.code.toString();
                return newState;
              });
          }
        }
      })
      .catch((error) => {
        // if statement to guard from re-render loop
        if (!status.fetchFailed) {
          setStatus(
            (prevState) => {
              const newState = {...prevState};

              newState.fetchFailed = true;
              newState.failContent = error.toString();
              return newState;
            });
        }
      });
  };

  const alertFetchFailed = (
    <Alert variant="danger">{t('posts.manage.fetch_post_failed', {error: status.failContent})}</Alert>
  );

  // Trigger the fetch request if not yet fetched
  if (!status.fetched) {
    fetchPost();
  }

  if (status.postContent) {
    return (
      <>
        <h3 className="mb-3">{t('posts.quest.general')}</h3>
        <div className="rounded bg-black-32 p-3">
          <Markdown>{status.postContent.general || 'N/A'}</Markdown>
        </div>

        <hr/>

        <h3 className="mb-3">{t('posts.quest.video')}</h3>
        <div className="rounded bg-black-32 p-3">
          <Markdown>{status.postContent.video || 'N/A'}</Markdown>
        </div>

        <hr/>

        <h3 className="mb-3">{t('posts.quest.positional')}</h3>
        <QuestPositionOutput info={status.postContent.info}/>

        <hr/>

        {
          status.postContent.addendum ?
            <>
              <h3 className="mb-3">{t('posts.quest.addendum')}</h3>
              <div className="rounded bg-black-32 p-3">
                <Markdown>{status.postContent.addendum}</Markdown>
              </div>
              <hr/>
            </> :
            <></>
        }

        <h3 className="mb-3">{t('posts.info.title_self')}</h3>
        <Row>
          <Col lg={4} className="pr-lg-2">
            <InfoCard title={t('posts.info.last_modified')} content={status.postContent.modified}/>
            <div className="d-lg-none mb-3"/>
          </Col>
          <Col lg={4} className="px-lg-2">
            <InfoCard title={t('posts.info.published')} content={status.postContent.published}/>
            <div className="d-lg-none mb-3"/>
          </Col>
          <Col lg={4} className="pl-lg-2">
            <InfoCard title={t('posts.info.view_count')} content={status.postContent.viewCount}/>
            <div className="d-lg-none mb-3"/>
          </Col>
        </Row>
      </>
    );
  } else {
    return status.fetchFailed ? alertFetchFailed : <></>;
  }
};

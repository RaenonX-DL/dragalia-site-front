import React from 'react';
import {useParams} from 'react-router-dom';
import {Alert, Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';

import {InfoCard} from '../elements/infoCard';
import {PostModificationNotes} from '../elements/postModNotes';
import {QuestPositionOutput} from '../elements/questPositionOutput';
import {FetchPost, Markdown, PostListEntry, PostManageBar, QuestPostFetchStatus} from '../elements';
import {PageProps} from './base';
import Path from '../../constants/path';
import {SUPPORTED_LANG_NAME} from '../../constants/lang';


export const QuestPage = ({fnSetTitle}: PageProps) => {
  const {t, i18n} = useTranslation();

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
    // Fetched and post available

    const alertIsAltLang = (
      <Alert variant="warning" className="mt-3">
        {
          t(
            'posts.message.alt_lang',
            {
              langUi: SUPPORTED_LANG_NAME.get(i18n.language),
              langPost: SUPPORTED_LANG_NAME.get(status.post.lang),
            },
          )
        }
      </Alert>
    );

    const alertOtherLangAvailable = (
      <Alert variant="info" className="mt-3">
        {t('posts.message.other_lang')}
        <br/>
        {
          status.post.otherLangs.map((langCode) => (
            <li key={langCode}>
              <Alert.Link href={Path.getQuest((status.post as PostListEntry).seqId) + `?lang=${langCode}`}>
                {SUPPORTED_LANG_NAME.get(langCode)}
              </Alert.Link>
            </li>
          ))
        }
      </Alert>);

    // FIXME: Paginator remove next (not available)

    return (
      <>
        {
          status.post.isAdmin ?
            <PostManageBar newPostUrl={Path.QUEST_NEW} editPostUrl={Path.getQuestEdit(status.post.seqId)}/> :
            <></>
        }
        {status.post.isAltLang ? alertIsAltLang : <></>}
        {status.post.otherLangs.length > 0 ? alertOtherLangAvailable : <></>}
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

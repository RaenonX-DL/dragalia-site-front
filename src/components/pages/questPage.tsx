import React, {Dispatch, SetStateAction} from 'react';
import {useParams} from 'react-router-dom';
import {Alert} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';

import {
  FetchPost,
  getGoogleUid,
  Markdown,
  PostFetchStatus,
  PostInfo,
  PostManageBar,
  QuestPositionOutput,
  QuestPostFetchStatus,
} from '../elements';
import {PageProps} from './base';
import {ApiRequestSender, QuestPostListEntry} from '../../constants/api';
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
              <Alert.Link href={Path.getQuest((status.post as QuestPostListEntry).seqId) + `?lang=${langCode}`}>
                {SUPPORTED_LANG_NAME.get(langCode)}
              </Alert.Link>
            </li>
          ))
        }
      </Alert>);

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

        <PostInfo post={status.post}/>
      </>
    );
  } else {
    const fnSendFetchRequest = () =>
      ApiRequestSender.questPostGet(getGoogleUid() || '', pid.toString(), i18n.language, true);

    return (
      <FetchPost
        status={status}
        fnSetStatus={setStatus as Dispatch<SetStateAction<PostFetchStatus>>} fnSendFetchRequest={fnSendFetchRequest}/>
    );
  }
};

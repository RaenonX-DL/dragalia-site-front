import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {Alert} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {SUPPORTED_LANG_NAME} from '../../../../constants/lang';
import Path from '../../../../constants/path';
import {ApiRequestSender, QuestPostListEntry} from '../../../../utils/services/api';

import {
  FetchPost,
  getGoogleUid,
  Markdown,
  PageAnchor,
  PostFetchStatus,
  PostInfo,
  PostManageBar,
  QuestPositionOutput,
  QuestPostFetchStatus,
  scrollToAnchor,
} from '../../../elements';
import {AdsInPost} from '../../ads';


type QuestPostOutputProps = {
  fnSetTitle: (newTitle: string) => void,
}


export const QuestPostOutput = ({fnSetTitle}: QuestPostOutputProps) => {
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

  useEffect(() => {
    // Only scroll to anchor if the post fetch succeed
    if (status.fetched && status.post) {
      scrollToAnchor();
    }
  });

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
          status.post.isAdmin &&
          <PostManageBar newPostUrl={Path.QUEST_NEW} editPostUrl={Path.getQuestEdit(status.post.seqId)}/>
        }
        {status.post.isAltLang && alertIsAltLang}
        {status.post.otherLangs.length > 0 && alertOtherLangAvailable}

        <PageAnchor name="general" type="h3" text={t('posts.quest.general')} className="mb-3"/>
        <div className="rounded bg-black-32 p-3">
          <Markdown>{status.post.general || 'N/A'}</Markdown>
        </div>

        <hr/>

        {status.post.showAds && <AdsInPost/>}

        <PageAnchor name="video" type="h3" text={t('posts.quest.video')} className="mb-3"/>
        <div className="rounded bg-black-32 p-3">
          <Markdown>{status.post.video || 'N/A'}</Markdown>
        </div>

        <hr/>

        <PageAnchor name="positional" type="h3" text={t('posts.quest.positional')} className="mb-3"/>
        <QuestPositionOutput info={status.post.info}/>

        <hr/>

        {status.post.showAds && <AdsInPost/>}

        {
          status.post.addendum &&
          <>
            <PageAnchor name="addendum" type="h3" text={t('posts.quest.addendum')} className="mb-3"/>
            <div className="rounded bg-black-32 p-3">
              <Markdown>{status.post.addendum}</Markdown>
            </div>
            <hr/>
          </>
        }

        {status.post.showAds && <AdsInPost/>}

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

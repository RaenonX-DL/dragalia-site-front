import React from 'react';

import Path from '../../../../../const/path/definitions';
import {useTranslation} from '../../../../../i18n/utils';
import {ApiRequestSender} from '../../../../../utils/services/api';
import {
  Markdown,
  PageAnchor,
  PostInfo,
  PostManageBar,
  QuestPositionOutput,
  QuestPostFetchStatus,
} from '../../../../elements';
import {PageProps} from '../../../../pages/props';
import {AdsInPost} from '../../../common/ads';
import {
  AlertIsAlternativeLanguage,
  AlertOtherLanguageAvailable,
} from '../../shared/output/alert';
import {OutputBase} from '../../shared/output/base';


export const QuestPostOutput = ({fnSetTitle}: PageProps) => {
  const {t} = useTranslation();

  const [status, setStatus] = React.useState<QuestPostFetchStatus>(
    {
      fetched: false,
      fetchFailed: false,
      post: null,
      failureMessage: '',
    },
  );

  return (
    <OutputBase
      fnSetTitle={fnSetTitle}
      status={status}
      setStatus={setStatus}
      getTitle={(pid) => (
        `#Q${pid} ${status.post ? status.post.title : t('pages.name.quest_post')}`
      )}
      fnSendFetchRequest={ApiRequestSender.questPostGet}
      renderOnFetched={(post) => {
        return (
          <>
            {
              post.isAdmin &&
              <PostManageBar
                newButtons={[{url: Path.QUEST_NEW}]}
                editPostUrl={Path.getQuestEdit(post.seqId)}
              />
            }
            {post.isAltLang && <AlertIsAlternativeLanguage response={post}/>}
            {post.otherLangs.length > 0 && <AlertOtherLanguageAvailable response={post}/>}

            <PageAnchor name="general" type="h3" text={t('posts.quest.general')} className="mb-3"/>
            <div className="rounded bg-black-32 p-3">
              <Markdown>{post.general}</Markdown>
            </div>
            <hr/>
            {post.showAds && <AdsInPost/>}
            <PageAnchor name="video" type="h3" text={t('posts.quest.video')} className="mb-3"/>
            <div className="rounded bg-black-32 p-3">
              <Markdown>{post.video || 'N/A'}</Markdown>
            </div>
            {post.showAds && <AdsInPost/>}
            <hr/>
            <PageAnchor name="positional" type="h3" text={t('posts.quest.positional')} className="mb-3"/>
            <QuestPositionOutput info={post.positional}/>
            <hr/>
            {
              post.addendum &&
              <>
                <PageAnchor name="addendum" type="h3" text={t('posts.quest.addendum')} className="mb-3"/>
                <div className="rounded bg-black-32 p-3">
                  <Markdown>{post.addendum}</Markdown>
                </div>
                <hr/>
              </>
            }
            {post.showAds && <AdsInPost/>}
            <PostInfo post={post}/>
          </>
        );
      }}
    />
  );
};

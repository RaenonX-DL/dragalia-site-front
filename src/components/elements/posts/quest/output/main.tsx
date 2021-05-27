import React from 'react';

import {GeneralPath, makeSimplePath, makePostPath, PostPath} from '../../../../../const/path';
import {useI18n} from '../../../../../i18n/hook';
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
  const {t, lang} = useI18n();

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
      getTitle={(pid) => t(
        (t) => t.meta.inUse.questPost.title,
        {title: status.post?.title || `#Q${pid}`},
      )}
      fnSendFetchRequest={ApiRequestSender.questGet}
      renderOnFetched={(post) => {
        return (
          <>
            {
              post.isAdmin &&
              <PostManageBar
                newButtons={[{url: makeSimplePath(GeneralPath.QUEST_NEW, {lang})}]}
                editPostUrl={makePostPath(PostPath.QUEST_EDIT, {pid: post.seqId, lang})}
              />
            }
            {post.isAltLang && <AlertIsAlternativeLanguage response={post}/>}
            {post.otherLangs.length > 0 && <AlertOtherLanguageAvailable response={post} pid={post.seqId}/>}

            <PageAnchor name="general" type="h3" text={t((t) => t.posts.quest.general)} className="mb-3"/>
            <div className="rounded bg-black-32 p-3">
              <Markdown>{post.general}</Markdown>
            </div>
            <hr/>
            <AdsInPost/>
            <PageAnchor name="video" type="h3" text={t((t) => t.posts.quest.video)} className="mb-3"/>
            <div className="rounded bg-black-32 p-3">
              <Markdown>{post.video || 'N/A'}</Markdown>
            </div>
            <AdsInPost/>
            <hr/>
            <PageAnchor name="positional" type="h3" text={t((t) => t.posts.quest.positional)} className="mb-3"/>
            <QuestPositionOutput info={post.positional}/>
            <hr/>
            {
              post.addendum &&
              <>
                <PageAnchor name="addendum" type="h3" text={t((t) => t.posts.quest.addendum)} className="mb-3"/>
                <div className="rounded bg-black-32 p-3">
                  <Markdown>{post.addendum}</Markdown>
                </div>
                <hr/>
              </>
            }
            <AdsInPost/>
            <PostInfo post={post}/>
          </>
        );
      }}
    />
  );
};

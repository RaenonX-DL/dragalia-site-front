import React from 'react';

import {QuestPostGetResponse} from '../../../../../api-def/api';
import {GeneralPath, makePostPath, PostPath} from '../../../../../const/path';
import {useI18n} from '../../../../../i18n/hook';
import {AdsInPost} from '../../../common/ads';
import {PageAnchor} from '../../../common/anchor/pageAnchor';
import {Markdown} from '../../../markdown/main';
import {PostManageBar} from '../../manageBar';
import {AlertIsAlternativeLanguage, AlertOtherLanguageAvailable} from '../../shared/output/alert';
import {PostInfo} from '../../shared/output/info';
import {QuestPositionOutput} from './positional';


type QuestPostOutputProps = {
  post: QuestPostGetResponse,
}

export const QuestPostOutput = ({post}: QuestPostOutputProps) => {
  const {t} = useI18n();

  return (
    <>
      {
        post.isAdmin &&
        <PostManageBar
          newButtons={[{url: GeneralPath.QUEST_NEW}]}
          editPostUrl={makePostPath(PostPath.QUEST_EDIT, {pid: post.seqId})}
        />
      }
      {post.isAltLang && <AlertIsAlternativeLanguage response={post}/>}
      {
        post.otherLangs.length > 0 &&
        <AlertOtherLanguageAvailable response={post} pid={post.seqId} targetPath={PostPath.QUEST}/>
      }

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
};

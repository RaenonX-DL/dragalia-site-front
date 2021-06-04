import React from 'react';

import {GeneralPath, makePostPath, PostPath} from '../../../../../const/path';
import {useI18n} from '../../../../../i18n/hook';
import {ApiRequestSender} from '../../../../../utils/services/api';
import {AdsInPost} from '../../../common/ads';
import {PageAnchor} from '../../../common/anchor/pageAnchor';
import {Markdown} from '../../../markdown/main';
import {PostManageBar} from '../../manageBar';
import {AlertIsAlternativeLanguage, AlertOtherLanguageAvailable} from '../../shared/output/alert';
import {OutputBase} from '../../shared/output/base';
import {PostInfo} from '../../shared/output/info';
import {QuestPostFetchStatus} from '../fetch';
import {QuestPositionOutput} from './positional';


export const QuestPostOutput = () => {
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
      status={status}
      setStatus={setStatus}
      fnSendFetchRequest={ApiRequestSender.questGet}
      renderOnFetched={(post) => {
        return (
          <>
            {
              post.isAdmin &&
              <PostManageBar
                newButtons={[{url: GeneralPath.QUEST_NEW}]}
                editPostUrl={makePostPath(PostPath.QUEST_EDIT, {pid: post.seqId, lang})}
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
      }}
    />
  );
};

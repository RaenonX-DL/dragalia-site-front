import React from 'react';

import {QuestPostGetResponse} from '../../../../../api-def/api';
import {GeneralPath, PostPath} from '../../../../../const/path/definitions';
import {AppReactContext} from '../../../../../context/app/main';
import {useI18n} from '../../../../../i18n/hook';
import {makePostPath} from '../../../../../utils/path/make';
import {AdsInPost} from '../../../common/ads';
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
  const context = React.useContext(AppReactContext);

  return (
    <>
      {
        context?.isAdmin &&
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

      <h3 className="mb-3">
        {t((t) => t.posts.quest.general)}
      </h3>
      <div className="rounded bg-black-32 p-3">
        <Markdown>{post.general}</Markdown>
      </div>
      <hr/>
      <AdsInPost/>
      <h3 className="mb-3">
        {t((t) => t.posts.quest.video)}
      </h3>
      <div className="rounded bg-black-32 p-3">
        <Markdown>{post.video || 'N/A'}</Markdown>
      </div>
      <AdsInPost/>
      <hr/>
      <h3 className="mb-3">
        {t((t) => t.posts.quest.positional)}
      </h3>
      <QuestPositionOutput info={post.positional}/>
      <hr/>
      {
        post.addendum &&
        <>
          <h3 className="mb-3">
            {t((t) => t.posts.quest.addendum)}
          </h3>
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

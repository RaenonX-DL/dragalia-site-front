import React from 'react';

import {useSession} from 'next-auth/react';

import {PostType, QuestPostGetResponse} from '../../../../../api-def/api';
import {GeneralPath, makePostUrl, PostPath} from '../../../../../api-def/paths';
import {useI18n} from '../../../../../i18n/hook';
import {AdsInPost} from '../../../../elements/common/ads/main';
import {Markdown} from '../../../../elements/markdown/main';
import {AlertVideoTips} from '../../../../elements/posts/alert';
import {PostConfigBar} from '../../../../elements/posts/configBar';
import {PostManageBar} from '../../../../elements/posts/manageBar';
import {AlertIsAlternativeLanguage, AlertOtherLanguageAvailable} from '../../../../elements/posts/output/alert';
import {PostInfo} from '../../../../elements/posts/output/info';
import {QuestPositionOutput} from './positional';


type Props = {
  post: QuestPostGetResponse,
};

export const QuestPostOutput = ({post}: Props) => {
  const {t, lang} = useI18n();
  const {data} = useSession();

  return (
    <>
      <PostConfigBar
        subscriptionKey={{type: 'post', postType: PostType.QUEST, id: post.seqId}}
        defaultSubscribed={post.userSubscribed}
      />
      {
        data?.user.isAdmin &&
        <PostManageBar
          newButtons={[{pathname: GeneralPath.QUEST_NEW}]}
          editPostUrl={makePostUrl(PostPath.QUEST_EDIT, {pid: post.seqId, lang})}
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
      <Markdown>{post.general}</Markdown>
      <hr/>
      <AdsInPost/>
      <h3 className="mb-3">
        {t((t) => t.posts.quest.video)}
      </h3>
      <Markdown>{post.video || 'N/A'}</Markdown>
      <div className="mt-2">
        <AlertVideoTips/>
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
          <Markdown>{post.addendum}</Markdown>
          <hr/>
        </>
      }
      <AdsInPost/>
      <PostInfo post={post}/>
    </>
  );
};

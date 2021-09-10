import React from 'react';

import {GeneralPath, PostPath} from '../../../../../const/path/definitions';
import {useI18n} from '../../../../../i18n/hook';
import {makePostUrl} from '../../../../../utils/path/make';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {PostList} from '../../../../elements/posts/list/main';
import {PostLookupPage} from '../../../../elements/posts/list/page';
import {QuestEntryBadge} from './listBadges';


export const QuestPostList = () => {
  const {t, lang} = useI18n();

  const title = t((t) => t.meta.inUse.post.quest.list.title);

  return (
    <PostLookupPage
      title={title}
      fnFetchList={ApiRequestSender.questList}
      postManageBarProps={{
        newButtons: [{pathname: GeneralPath.QUEST_NEW}],
      }}
      renderPostEntries={(response) => (
        <PostList
          entries={response.posts}
          generateLink={(postId) => (
            makePostUrl(PostPath.QUEST, {pid: postId, lang})
          )}
          renderPostBadge={(props) => <QuestEntryBadge {...props}/>}
        />
      )}
    />
  );
};

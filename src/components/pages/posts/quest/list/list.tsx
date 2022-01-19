import React from 'react';

import {PostType} from '../../../../../api-def/api';
import {GeneralPath} from '../../../../../api-def/paths';
import {useI18n} from '../../../../../i18n/hook';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {PostList} from '../../../../elements/posts/list/main';
import {PostLookupPage} from '../../../../elements/posts/list/page';
import {QuestEntryBadge} from './badge';


export const QuestPostList = () => {
  const {t} = useI18n();

  const title = t((t) => t.meta.inUse.post.quest.list.title);

  return (
    <PostLookupPage
      title={title}
      fnFetchList={ApiRequestSender.questList}
      postManageBarProps={{
        newButtons: [{pathname: GeneralPath.QUEST_NEW}],
      }}
      renderPostEntries={({response, globalSubscribed}) => (
        <PostList
          entries={response.posts}
          postType={PostType.QUEST}
          renderPostBadge={(props) => <QuestEntryBadge {...props}/>}
          disableSubscription={globalSubscribed}
        />
      )}
      subKeyName="ALL_QUEST"
    />
  );
};

import React from 'react';

import {PostListPage} from '../../../src/components/elements/posts/list/page';
import {QuestPostList} from '../../../src/components/pages/posts/quest/list/list';
import {GeneralPath, PostPath} from '../../../src/const/path/definitions';
import {useI18n} from '../../../src/i18n/hook';
import {makePostUrl} from '../../../src/utils/path/make';
import {ApiRequestSender} from '../../../src/utils/services/api/requestSender';


const QuestList = () => {
  const {t, lang} = useI18n();

  const title = t((t) => t.meta.inUse.post.quest.list.title);

  return (
    <PostListPage
      title={title}
      fnFetchList={ApiRequestSender.questList}
      postManageBarProps={{
        newButtons: [{pathname: GeneralPath.QUEST_NEW}],
      }}
      renderPostEntries={(response) => (
        <QuestPostList
          entries={response.posts}
          generateLink={(postId) => (
            makePostUrl(PostPath.QUEST, {pid: postId, lang})
          )}
        />
      )}
    />
  );
};

export default QuestList;

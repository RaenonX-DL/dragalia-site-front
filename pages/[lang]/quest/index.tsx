import React from 'react';

import {QuestPostList} from '../../../src/components/elements/posts/quest/list/list';
import {PostListPage} from '../../../src/components/elements/posts/shared/list/page';
import {GeneralPath, PostPath} from '../../../src/const/path/definitions';
import {useI18n} from '../../../src/i18n/hook';
import {makePostPath} from '../../../src/utils/path/make';
import {ApiRequestSender} from '../../../src/utils/services/api/requestSender';


const QuestList = () => {
  const {t, lang} = useI18n();

  const title = t((t) => t.meta.inUse.questList.title);

  return (
    <PostListPage
      title={title}
      currentUrl={GeneralPath.QUEST_LIST}
      fnFetchList={ApiRequestSender.questList}
      postManageBarProps={{
        newButtons: [{url: GeneralPath.QUEST_NEW}],
      }}
      renderPostEntries={(response) => (
        <QuestPostList
          entries={response.posts}
          generateLink={(postId) => (
            makePostPath(PostPath.QUEST, {pid: postId, lang})
          )}
        />
      )}
    />
  );
};

export default QuestList;

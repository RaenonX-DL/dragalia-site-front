import React from 'react';

import {GeneralPath, makeSimplePath, makePostPath, PostPath} from '../../../../const/path';
import {useI18n} from '../../../../i18n/hook';
import {ApiRequestSender} from '../../../../utils/services/api';
import {PostListPage, QuestPostList} from '../../../elements';
import {PageProps} from '../../props';


export const QuestList = ({fnSetTitle}: PageProps) => {
  const {t, lang} = useI18n();

  const title = t((t) => t.meta.inUse.questList.title);

  fnSetTitle(title);

  return (
    <PostListPage
      title={title}
      currentUrl={makeSimplePath(GeneralPath.QUEST_LIST, {lang})}
      fnFetchList={ApiRequestSender.questList}
      postManageBarProps={{
        newButtons: [{url: makeSimplePath(GeneralPath.QUEST_NEW, {lang})}],
      }}
      renderPostEntries={(response) => (
        <QuestPostList
          entries={response.posts}
          generateLink={(postId) => makePostPath(PostPath.QUEST, {pid: postId, lang})}
        />
      )}
    />
  );
};

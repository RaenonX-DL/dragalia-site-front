import React from 'react';

import Path from '../../../../const/path/definitions';
import {useTranslation} from '../../../../i18n/utils';
import {ApiRequestSender} from '../../../../utils/services/api';
import {PostListPage, QuestPostList} from '../../../elements';
import {PageProps} from '../../props';


export const QuestList = ({fnSetTitle}: PageProps) => {
  const {t} = useTranslation();

  const title = t('pages.name.quest_list');

  fnSetTitle(title);

  return (
    <PostListPage
      title={title}
      currentUrl={Path.QUEST_LIST}
      fnFetchList={ApiRequestSender.questPostList}
      postManageBarProps={{
        newButtons: [{url: Path.QUEST_NEW}],
      }}
      renderPostEntries={(response) => (
        <QuestPostList
          entries={response.posts}
          generateLink={(postId) => Path.getQuest(postId)}
        />
      )}
    />
  );
};

import React from 'react';
import {useTranslation} from 'react-i18next';
import Path from '../../../../constants/path';
import {ApiRequestSender, QuestPostListEntry} from '../../../../utils/services/api';
import {PostListPage, QuestPostList} from '../../../elements';

import {PageProps} from '../../base';


export const QuestList = ({fnSetTitle}: PageProps) => {
  const {t} = useTranslation();

  const title = t('pages.name.quest_list');

  fnSetTitle(title);

  return (
    <PostListPage
      fnFetchList={ApiRequestSender.questPostList}
      fnGetPostListJsx={
        (posts) =>
          <QuestPostList
            posts={posts as Array<QuestPostListEntry>}
            linkGenerator={(id) => Path.getQuest(id)}/>
      }
      title={title} currentUrl={Path.QUEST_LIST} postManageBarProps={{newPostUrl: Path.QUEST_NEW}}/>
  );
};

import React from 'react';

import {QuestPostListEntry} from '../../../../../api-def/api';
import {LinkGenerator} from '../../shared/list/entry';
import {PostList} from '../../shared/list/list';
import {QuestEntryBadges} from './listBadges';


type PostListProps = {
  entries: Array<QuestPostListEntry>,
  generateLink: LinkGenerator,
};

export const QuestPostList = ({entries, generateLink}: PostListProps) => {
  return (
    <PostList
      entries={entries}
      generateLink={generateLink}
      renderPostBadges={(props) => <QuestEntryBadges {...props}/>}
    />
  );
};

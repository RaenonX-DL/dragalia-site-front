import React from 'react';

import {QuestPostListEntry} from '../../../../../api-def/api';
import {LinkGenerator} from '../../../../elements/posts/list/entry';
import {PostList} from '../../../../elements/posts/list/list';
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

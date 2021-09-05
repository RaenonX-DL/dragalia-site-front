import React from 'react';

import {QuestPostListEntry} from '../../../../../api-def/api';
import {LinkGenerator} from '../../../../elements/posts/list/entry';
import {PostList} from '../../../../elements/posts/list/list';
import {QuestEntryBadges} from './listBadges';


type Props = {
  entries: Array<QuestPostListEntry>,
  generateLink: LinkGenerator,
};

export const QuestPostList = ({entries, generateLink}: Props) => {
  return (
    <PostList
      entries={entries}
      generateLink={generateLink}
      renderPostBadge={(props) => <QuestEntryBadges {...props}/>}
    />
  );
};

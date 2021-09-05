import React from 'react';

import {MiscPostListEntry} from '../../../../../api-def/api';
import {LinkGenerator} from '../../../../elements/posts/list/entry';
import {PostList} from '../../../../elements/posts/list/list';
import {MiscEntryBadge} from './listBadges';


type Props = {
  entries: Array<MiscPostListEntry>,
  generateLink: LinkGenerator,
};

export const MiscPostList = ({entries, generateLink}: Props) => {
  return (
    <PostList
      entries={entries}
      generateLink={generateLink}
      renderPostBadge={(props) => <MiscEntryBadge {...props}/>}
    />
  );
};

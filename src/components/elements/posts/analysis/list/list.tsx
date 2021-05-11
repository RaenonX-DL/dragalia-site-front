import React from 'react';

import {AnalysisListEntry} from '../../../../../api-def/api';
import {LinkGenerator} from '../../shared/list/entry';
import {PostList} from '../../shared/list/list';
import {AnalysisEntryBadges} from './listBadges';


type PostListProps = {
  entries: Array<AnalysisListEntry>,
  generateLink: LinkGenerator,
};

export const AnalysisPostList = ({entries, generateLink}: PostListProps) => {
  return (
    <PostList
      entries={entries}
      generateLink={generateLink}
      renderPostBadges={(props) => <AnalysisEntryBadges {...props}/>}
    />
  );
};

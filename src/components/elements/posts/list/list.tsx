import React from 'react';

import {SequencedPostInfo} from '../../../../api-def/api';
import {Search} from '../../input/search/main';
import {PostEntry, PostEntryProps} from './entry';


type PostListProps<E extends SequencedPostInfo> = PostEntryProps<E> & {
  entries: Array<E>,
};


export const PostList = <E extends SequencedPostInfo>({entries, ...props}: PostListProps<E>) => {
  return (
    <Search
      options={entries}
      isOptionMatchSearch={(option, textLowered) => option.title.toLowerCase().includes(textLowered)}
      renderMatchedSelection={(entry) => <PostEntry entry={entry} {...props}/>}
      height="70vh"
    />
  );
};

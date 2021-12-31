import React from 'react';

import {SequencedPostInfo} from '../../../../api-def/api';
import {transformForSearch} from '../../../../utils/text';
import {Search} from '../../input/search/main';
import {SequencedPostEntry} from './seqEntry';
import {PostEntryProps} from './types';


type PostListProps<E extends SequencedPostInfo> = PostEntryProps<E> & {
  entries: Array<E>,
};

export const PostList = <E extends SequencedPostInfo>({entries, ...props}: PostListProps<E>) => {
  return (
    <Search
      options={entries}
      isOptionMatchSearch={(option, searchText) => (
        transformForSearch(option.title, {variantInsensitive: false}).includes(searchText)
      )}
      renderMatchedSelection={(entry) => <SequencedPostEntry entry={entry} {...props}/>}
      height="70vh"
    />
  );
};

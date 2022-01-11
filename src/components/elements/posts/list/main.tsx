import React from 'react';

import {SequencedPostInfo} from '../../../../api-def/api';
import {transformForSearch} from '../../../../utils/text';
import {Search} from '../../input/search/main';
import {SequencedPostEntry} from './seqEntry';
import {PostEntryProps} from './types';


type PostListProps<E extends SequencedPostInfo> = Omit<PostEntryProps<E>, 'link'> & {
  entries: Array<E>,
  getLink: (entry: E) => string,
};

export const PostList = <E extends SequencedPostInfo>({entries, getLink, ...props}: PostListProps<E>) => {
  return (
    <Search
      options={entries}
      isOptionMatchSearch={(option, searchText) => (
        transformForSearch(option.title, {variantInsensitive: false}).includes(searchText)
      )}
      renderMatchedSelection={(entry) => <SequencedPostEntry entry={entry} link={getLink(entry)} {...props}/>}
      height="70vh"
    />
  );
};

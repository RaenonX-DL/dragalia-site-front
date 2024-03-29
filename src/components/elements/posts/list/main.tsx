import React from 'react';

import {PostType, SequencedPostInfo} from '../../../../api-def/api';
import {transformForSearch} from '../../../../utils/text';
import {Search} from '../../input/search/main';
import {SequencedPostEntry} from './seqEntry';
import {PostEntryProps} from './types';


type PostListProps<E extends SequencedPostInfo> = Omit<PostEntryProps<E>, 'link'> & {
  entries: Array<E>,
  postType: PostType,
  disableSubscription: boolean,
};

export const PostList = <E extends SequencedPostInfo>({
  entries,
  postType,
  disableSubscription,
  ...props
}: PostListProps<E>) => {
  return (
    <Search
      options={entries}
      isOptionMatchSearch={(option, searchText) => (
        transformForSearch(option.title, {variantInsensitive: false}).includes(searchText)
      )}
      renderMatchedSelection={(entry) => (
        <SequencedPostEntry
          entry={entry}
          type={postType}
          disableSubscription={disableSubscription}
          {...props}
        />
      )}
      height="70vh"
    />
  );
};

import React from 'react';

import {PostType, SequencedPostInfo} from '../../../../api-def/api';
import {PostEntry} from './entry';
import {PostEntryProps} from './types';


type PostEntryPropsInternal<E extends SequencedPostInfo> = PostEntryProps<E> & {
  entry: E,
  type: PostType,
};

export const SequencedPostEntry = <E extends SequencedPostInfo>({
  entry,
  type,
  renderPostBadge,
}: PostEntryPropsInternal<E>) => {
  return (
    <PostEntry
      entry={entry}
      type={type}
      pid={entry.seqId}
      title={entry.title}
      renderPostBadge={renderPostBadge}
    />
  );
};

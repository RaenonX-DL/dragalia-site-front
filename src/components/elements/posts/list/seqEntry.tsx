import React from 'react';

import {SequencedPostInfo} from '../../../../api-def/api';
import {PostEntry} from './entry';
import {PostEntryProps} from './types';


type PostEntryPropsInternal<E extends SequencedPostInfo> = PostEntryProps<E> & {
  entry: E,
};

export const SequencedPostEntry = <E extends SequencedPostInfo>({
  entry,
  getLink,
  renderPostBadge,
}: PostEntryPropsInternal<E>) => {
  return (
    <PostEntry
      entry={entry}
      getLink={() => getLink(entry)}
      getTitle={() => entry.title}
      renderPostBadge={renderPostBadge}
    />
  );
};

import React from 'react';

import {SequencedPostInfo} from '../../../../api-def/api';
import {PostEntry} from './entry';
import {PostEntryProps} from './types';


type PostEntryPropsInternal<E extends SequencedPostInfo> = PostEntryProps<E> & {
  entry: E,
};

export const SequencedPostEntry = <E extends SequencedPostInfo>({
  entry,
  link,
  renderPostBadge,
}: PostEntryPropsInternal<E>) => {
  return (
    <PostEntry
      entry={entry}
      link={link}
      title={entry.title}
      renderPostBadge={renderPostBadge}
    />
  );
};

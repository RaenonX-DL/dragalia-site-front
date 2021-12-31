import React from 'react';

import Badge from 'react-bootstrap/Badge';

import {MiscPostListEntry} from '../../../../../api-def/api';
import {PostEntryBadgeProps} from '../../../../elements/posts/list/types';


type Props<E extends MiscPostListEntry> = PostEntryBadgeProps<E>;

export const MiscEntryBadge = <E extends MiscPostListEntry>({entry}: Props<E>) => {
  return <Badge variant="info">#{entry.seqId}</Badge>;
};

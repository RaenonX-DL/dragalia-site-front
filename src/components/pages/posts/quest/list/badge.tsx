import React from 'react';

import Badge from 'react-bootstrap/Badge';

import {QuestPostListEntry} from '../../../../../api-def/api';
import {PostEntryBadgeProps} from '../../../../elements/posts/list/types';


type Props<E extends QuestPostListEntry> = PostEntryBadgeProps<E>;

export const QuestEntryBadge = <E extends QuestPostListEntry>({entry}: Props<E>) => {
  return <Badge variant="primary">#{entry.seqId}</Badge>;
};

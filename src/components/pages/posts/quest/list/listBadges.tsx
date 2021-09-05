import React from 'react';

import Badge from 'react-bootstrap/Badge';

import {QuestPostListEntry} from '../../../../../api-def/api';
import {PostEntryBadgeProps} from '../../../../elements/posts/list/entry';


type Props<E extends QuestPostListEntry> = PostEntryBadgeProps<E>

export const QuestEntryBadges = <E extends QuestPostListEntry>({entry}: Props<E>) => {
  return <h4><Badge variant="primary">#{entry.seqId}</Badge></h4>;
};

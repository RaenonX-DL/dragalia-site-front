import React from 'react';

import Badge from 'react-bootstrap/Badge';

import {QuestPostListEntry} from '../../../../../api-def/api';
import {PostEntryBadgesProps} from '../../../../elements/posts/list/entry';


type QuestEntryBadgesProps<E extends QuestPostListEntry> = PostEntryBadgesProps<E>

export const QuestEntryBadges = <E extends QuestPostListEntry>({entry}: QuestEntryBadgesProps<E>) => {
  return <h4><Badge variant="primary">#{entry.seqId}</Badge></h4>;
};

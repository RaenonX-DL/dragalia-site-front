import React from 'react';

import {PostInfo, SequencedPostInfo} from '../../../../api-def/api';


export type FunctionGetPostLink<E extends PostInfo> = (info: E) => string;

export type PostEntryBadgeProps<E extends PostInfo> = {
  entry: E,
};

export type FunctionRenderPostBadge<E extends PostInfo> = (props: PostEntryBadgeProps<E>) => React.ReactElement;

export type PostEntryProps<E extends SequencedPostInfo> = {
  getLink: FunctionGetPostLink<E>,
  renderPostBadge: FunctionRenderPostBadge<E>,
};

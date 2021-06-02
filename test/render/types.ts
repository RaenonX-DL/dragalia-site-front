import React from 'react';

import {RenderResult} from '@testing-library/react';
import {MemoryHistory} from 'history';

import {PartialReduxState} from '../../src/state/state';
import {ReduxStore} from '../../src/state/store';

export type RenderOptions = {
  preloadState?: PartialReduxState,
  route?: string,
}

export type RenderReturns = RenderResult & {
  rerender: (element?: React.ReactElement) => void,
  store: ReduxStore,
  history: MemoryHistory,
}

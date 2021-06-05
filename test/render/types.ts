import React from 'react';

import {RenderResult} from '@testing-library/react';
import {NextRouter} from 'next/router';

import {PartialReduxState} from '../../src/state/state';
import {ReduxStore} from '../../src/state/store';

export type RenderOptions = {
  preloadState?: PartialReduxState,
  routerOptions?: Partial<NextRouter>
}

export type RenderReturns = RenderResult & {
  rerender: (element?: React.ReactElement) => void,
  store: ReduxStore,
}

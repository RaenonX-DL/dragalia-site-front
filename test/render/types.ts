import React from 'react';

import {RenderResult} from '@testing-library/react';
import {User} from 'next-auth';
import {NextRouter} from 'next/router';

import {AppReactContextValue} from '../../src/context/app/types';
import {PreloadedReduxState} from '../../src/state/state';
import {ReduxStore} from '../../src/state/store';


export type RenderOptions = {
  preloadState?: PreloadedReduxState,
  routerOptions?: Partial<NextRouter>,
  context?: Partial<AppReactContextValue>,
  user?: Partial<User>,
}

export type RenderAppReturns = RenderResult & {
  rerender: (element?: React.ReactElement) => void,
  store: ReduxStore,
}

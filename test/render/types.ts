import React from 'react';

import {RenderResult} from '@testing-library/react';
import {User} from 'next-auth';
import {NextRouter} from 'next/router';

import {AlertEntry} from '../../src/api-def/api';
import {PreloadedReduxState} from '../../src/state/state';
import {ReduxStore} from '../../src/state/store';


export type RenderOptions = {
  preloadState?: PreloadedReduxState,
  routerOptions?: Partial<NextRouter>,
  user?: Partial<User>,
  hasSession?: boolean,
  alerts?: Array<AlertEntry>,
}

export type RenderAppReturns = RenderResult & {
  rerender: (element?: React.ReactElement) => void,
  store: ReduxStore,
}

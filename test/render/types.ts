import React from 'react';

import {RenderResult} from '@testing-library/react';
import {User} from 'next-auth';
import {NextRouter} from 'next/router';

import {AlertEntry, PageMetaResponse} from '../../src/api-def/api';
import {SimpleUnitInfo} from '../../src/api-def/resources/types/simpleInfo';
import {PreloadedReduxState, ReduxStore} from '../../src/state/types';


export type RenderOptions = {
  preloadState?: PreloadedReduxState,
  routerOptions?: Partial<NextRouter>,
  user?: Partial<User>,
  hasSession?: boolean,
  alerts?: Array<AlertEntry>,
  contextParams?: PageMetaResponse['params'],
  simpleUnitInfo?: SimpleUnitInfo,
}

export type RenderAppReturns = RenderResult & {
  rerender: (element?: React.ReactElement) => void,
  store: ReduxStore,
}

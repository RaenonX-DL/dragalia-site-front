import React from 'react';

import {RenderResult} from '@testing-library/react';
import {User} from 'next-auth';
import {NextRouter} from 'next/router';

import {AlertEntry, PageMetaResponse} from '../../src/api-def/api';
import {AppReactContextValue} from '../../src/context/app/types';
import {PreloadedReduxState, ReduxStore} from '../../src/state/types';
import {PageMeta} from '../../src/utils/meta/types';
import {DeepPartial} from '../../src/utils/types';


export type RenderOptions = DeepPartial<Omit<AppReactContextValue, keyof PageMeta | 'session'>> & {
  preloadState?: PreloadedReduxState,
  routerOptions?: Partial<NextRouter>,
  user?: Partial<User>,
  hasSession?: boolean,
  alerts?: Array<AlertEntry>,
  contextParams?: PageMetaResponse['params'],
}

export type RenderAppReturns = RenderResult & {
  rerender: (element?: React.ReactElement) => void,
  store: ReduxStore,
}

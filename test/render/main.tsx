import React from 'react';

import {render} from '@testing-library/react';
import {renderHook} from '@testing-library/react-hooks';
import {ObjectId} from 'mongodb';
import {Session} from 'next-auth';
import {SessionProvider} from 'next-auth/react';
import {RouterContext} from 'next/dist/shared/lib/router-context';

import {DEFAULT_LANG} from '../../src/api-def/api';
import {EnumEntry} from '../../src/api-def/resources';
import {AppReactContext} from '../../src/context/app/main';
import {AppReactContextValue} from '../../src/context/app/types';
import {ReduxProvider} from '../../src/state/provider';
import {createStore} from '../../src/state/store';
import {ReduxStore} from '../../src/state/types';
import {overrideObject} from '../../src/utils/override';
import {makeRouter} from './router';
import {RenderOptions, RenderAppReturns} from './types';


type WrapperProps = {
  store: ReduxStore,
  options?: RenderOptions,
};

const RenderWrapper = ({store, options, children}: React.PropsWithChildren<WrapperProps>) => {
  const session: Session = {
    expires: '99999999999',
    user: {
      id: new ObjectId().toHexString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isAdmin: false,
      lang: DEFAULT_LANG,
      ...options?.user,
    },
  };

  const context: AppReactContextValue = {
    title: 'Title',
    description: 'Description',
    alerts: options?.alerts || [],
    params: options?.contextParams || {},
    resources: overrideObject(
      {
        afflictions: {status: [] as Array<EnumEntry>},
        simpleUnitInfo: {},
      },
      options?.resources,
    ),
  };

  return (
    <RouterContext.Provider value={makeRouter(options?.routerOptions)}>
      <AppReactContext.Provider value={context}>
        <SessionProvider session={options?.hasSession || options?.user ? session : null}>
          <ReduxProvider persist={false} reduxStore={store}>
            {children}
          </ReduxProvider>
        </SessionProvider>
      </AppReactContext.Provider>
    </RouterContext.Provider>
  );
};

export const renderReactHook = <T, >(
  callback: (...params: any[]) => T,
  options?: RenderOptions,
) => {
  const store = createStore(options?.preloadState);

  return renderHook(
    callback,
    {
      wrapper: RenderWrapper,
      initialProps: {options, store},
    },
  );
};

export const renderReact = (
  getReactElement: () => React.ReactElement,
  options?: RenderOptions,
): RenderAppReturns => {
  const store = createStore(options?.preloadState);

  const app = render(
    <RenderWrapper options={options} store={store}>
      {getReactElement()}
    </RenderWrapper>,
  );

  const rerender = () => {
    app.rerender(
      <RenderWrapper options={options} store={store}>
        {getReactElement()}
      </RenderWrapper>,
    );
  };

  return {...app, rerender, store};
};

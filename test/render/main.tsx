import React from 'react';

import {render} from '@testing-library/react';
import {renderHook} from '@testing-library/react-hooks';
import {ObjectId} from 'mongodb';
import {Session} from 'next-auth';
import {Provider} from 'next-auth/client';
import {RouterContext} from 'next/dist/next-server/lib/router-context';

import {AppReactContext} from '../../src/context/app/main';
import {AppReactContextValue} from '../../src/context/app/types';
import {ReduxProvider} from '../../src/state/provider';
import {createStore, ReduxStore} from '../../src/state/store';
import {makeRouter} from './router';
import {RenderOptions, RenderAppReturns} from './types';


type WrapperProps = {
  store: ReduxStore,
  options?: RenderOptions,
}

const RenderWrapper = ({store, options, children}: React.PropsWithChildren<WrapperProps>) => {
  const context: AppReactContextValue = {
    title: 'Title',
    description: 'Description',
    ...options?.context,
  };

  const session: Session = {
    expires: '99999999999',
    user: {
      id: new ObjectId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isAdmin: false,
      ...options?.user,
    },
  };

  return (
    <Provider session={session}>
      <RouterContext.Provider value={makeRouter(options?.routerOptions)}>
        <AppReactContext.Provider value={context}>
          <ReduxProvider persist={false} reduxStore={store}>
            {children}
          </ReduxProvider>
        </AppReactContext.Provider>
      </RouterContext.Provider>
    </Provider>
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

import React from 'react';

import {render} from '@testing-library/react';
import {RouterContext} from 'next/dist/next-server/lib/router-context';

import {AppReactContext} from '../../src/context/app/main';
import {ReduxProvider} from '../../src/state/provider';
import {createStore, ReduxStore} from '../../src/state/store';
import {makeRouter} from './router';
import {RenderOptions, RenderReturns} from './types';


type WrapperProps = {
  store: ReduxStore,
  options?: RenderOptions,
}

const RenderWrapper = ({store, options, children}: React.PropsWithChildren<WrapperProps>) => {
  const context = {
    title: 'Title',
    description: 'Description',
    showAds: true,
    ...options?.context,
  };

  return (
    <RouterContext.Provider value={makeRouter(options?.routerOptions)}>
      <AppReactContext.Provider value={context}>
        <ReduxProvider persist={false} reduxStore={store}>
          {children}
        </ReduxProvider>
      </AppReactContext.Provider>
    </RouterContext.Provider>
  );
};

export const renderReact = (
  getReactElement: () => React.ReactElement,
  options?: RenderOptions,
): RenderReturns => {
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

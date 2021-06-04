import React from 'react';

import {render} from '@testing-library/react';

import {ReduxProvider} from '../../src/state/provider';
import {createStore, ReduxStore} from '../../src/state/store';
import {RenderOptions, RenderReturns} from './types';

type WrapperProps = {
  store: ReduxStore,
  options?: RenderOptions,
}

const RenderWrapper = ({store, children}: React.PropsWithChildren<WrapperProps>) => {
  return (
    <ReduxProvider reduxStore={store}>
      {children}
    </ReduxProvider>
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

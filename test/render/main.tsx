import React from 'react';

import {render} from '@testing-library/react';
import {createMemoryHistory, MemoryHistory} from 'history';
import {Router} from 'react-router-dom';

import {Main} from '../../src/main';
import {ReduxProvider} from '../../src/state/provider';
import {createStore, ReduxStore} from '../../src/state/store';
import {RenderOptions, RenderReturns} from './types';

type WrapperProps = {
  store: ReduxStore,
  options?: RenderOptions,
  history: MemoryHistory,
}

const RenderWrapper = ({history, store, children}: React.PropsWithChildren<WrapperProps>) => {
  return (
    <Router history={history}>
      <ReduxProvider persist={false} reduxStore={store}>
        {children}
      </ReduxProvider>
    </Router>
  );
};

export const renderReact = (
  getReactElement: () => React.ReactElement,
  options?: RenderOptions,
): RenderReturns => {
  const store = createStore(options?.preloadState);
  const history = createMemoryHistory({initialEntries: [options?.route || '']});

  const app = render(
    <RenderWrapper history={history} options={options} store={store}>
      {getReactElement()}
    </RenderWrapper>,
  );

  const rerender = () => {
    app.rerender(
      <RenderWrapper history={history} options={options} store={store}>
        {getReactElement()}
      </RenderWrapper>,
    );
  };

  return {...app, rerender, store, history};
};

export const renderApp = (
  route: string,
  options?: RenderOptions,
): RenderReturns => {
  return renderReact(() => <Main/>, {...options, route});
};

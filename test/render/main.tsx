import React from 'react';

import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';

import {Main} from '../../src/main';
import {ReduxProvider} from '../../src/state/provider';
import {createStore, ReduxStore} from '../../src/state/store';
import {RenderOptions, RenderReturns} from './types';

type WrapperProps = {
  store: ReduxStore,
  options?: RenderOptions,
}

const RenderWrapper = ({options, store, children}: React.PropsWithChildren<WrapperProps>) => {
  return (
    <MemoryRouter initialEntries={[options?.route || '']}>
      <ReduxProvider persist={false} reduxStore={store}>
        {children}
      </ReduxProvider>
    </MemoryRouter>
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

  return {rerender, store};
};

export const renderApp = async (
  route: string,
  options?: RenderOptions,
): Promise<RenderReturns> => {
  return renderReact(() => <Main/>, {...options, route});
};

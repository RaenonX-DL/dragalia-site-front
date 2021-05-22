import React from 'react';

import {render} from '@testing-library/react';
import {mount, ReactWrapper} from 'enzyme';
import {act} from 'react-dom/test-utils';
import {MemoryRouter} from 'react-router-dom';

import {Main} from '../../src/main';
import {ReduxProvider} from '../../src/state/provider';
import {PartialReduxState} from '../../src/state/state';
import {createStore} from '../../src/state/store';
import {RenderReturns, RenderReactReturns} from './types';

/**
 * Wrapper function to wait for the app completed rendering.
 *
 * @param {ReactWrapper} wrapper
 * @return {Promise<void>}
 * @see https://stackoverflow.com/a/63612692/11571888
 */
export const waitForPaint = async (wrapper: ReactWrapper) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve));
    wrapper.update();
  });
};

type RenderOptions = {
  preloadState?: PartialReduxState,
  route?: string,
}

export const renderMount = async (
  jsxElement: JSX.Element,
  options?: RenderOptions,
) => {
  const store = createStore(options?.preloadState);

  const app = mount(
    <MemoryRouter initialEntries={[options?.route || '']}>
      <ReduxProvider persist={false} reduxStore={store}>
        {jsxElement}
      </ReduxProvider>
    </MemoryRouter>,
  );

  await waitForPaint(app);

  return {app, store};
};

export const renderReact = async (
  jsxElement: JSX.Element,
  options?: RenderOptions,
): Promise<RenderReactReturns> => {
  const store = createStore(options?.preloadState);

  const app = render(
    <MemoryRouter initialEntries={[options?.route || '']}>
      <ReduxProvider persist={false} reduxStore={store}>
        {jsxElement}
      </ReduxProvider>
    </MemoryRouter>,
  );

  return {app, store};
};

type RenderAppOptions = Pick<RenderOptions, 'preloadState'>;

export const renderApp = async (
  route: string,
  options?: RenderAppOptions,
): Promise<RenderReturns> => {
  return renderMount(<Main/>, {...options, route});
};

import React from 'react';

import {mount, ReactWrapper} from 'enzyme';
import {act} from 'react-dom/test-utils';
import {MemoryRouter} from 'react-router-dom';

import {Main} from '../../src/main';
import {ReduxProvider} from '../../src/state/provider';
import {PartialReduxState} from '../../src/state/state';
import {createStore} from '../../src/state/store';
import {RenderReturns} from './types';

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
  waitToPaint?: boolean,
}

export const render = async (
  route: string,
  jsxElement: JSX.Element,
  options?: RenderOptions,
) => {
  const store = createStore(options?.preloadState);

  const app = mount(
    <MemoryRouter initialEntries={[route]}>
      <ReduxProvider persist={false} reduxStore={store}>
        {jsxElement}
      </ReduxProvider>
    </MemoryRouter>,
  );

  if (!!options?.waitToPaint) {
    await waitForPaint(app);
  }

  return {app, store};
};

export const renderApp = async (
  route: string,
  options?: RenderOptions,
): Promise<RenderReturns> => {
  return render(route, <Main/>, options);
};

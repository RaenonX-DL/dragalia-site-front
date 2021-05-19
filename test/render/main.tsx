import React from 'react';

import {mount, ReactWrapper} from 'enzyme';
import {act} from 'react-dom/test-utils';
import {MemoryRouter} from 'react-router-dom';

import Main from '../../src/main';
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

export const renderApp = async (
  route: string,
  options?: RenderOptions,
): Promise<RenderReturns> => {
  const store = createStore(options?.preloadState);

  const app = mount(
    <MemoryRouter initialEntries={[route]}>
      <Main persist={false} reduxStore={store}/>
    </MemoryRouter>,
  );

  if (!!options?.waitToPaint) {
    await waitForPaint(app);
  }

  return {app, store};
};

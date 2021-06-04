import React from 'react';

import {Provider} from 'react-redux';

import {createStore, ReduxStore} from './store';

export type ReduxProviderProps = {
  reduxStore?: ReduxStore,
}

export const ReduxProvider = (
  {children, reduxStore}: React.PropsWithChildren<ReduxProviderProps>,
) => {
  if (!reduxStore) {
    reduxStore = createStore();
  }

  return (
    <Provider store={reduxStore}>
      {children}
    </Provider>
  );
};

import React from 'react';

import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

import {createStore, ReduxStore} from './store';

export type ReduxProviderProps = {
  reduxStore?: ReduxStore,
  persist?: boolean,
}

export const ReduxProvider = (
  {children, reduxStore, persist = true}: React.PropsWithChildren<ReduxProviderProps>,
) => {
  if (!reduxStore) {
    reduxStore = createStore();
  }

  return (
    <Provider store={reduxStore}>
      {
        persist ?
          <PersistGate persistor={persistStore(reduxStore)}>{children}</PersistGate> :
          children
      }
    </Provider>
  );
};

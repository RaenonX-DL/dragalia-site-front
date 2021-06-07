import {configureStore} from '@reduxjs/toolkit';
import {useDispatch as useReduxDispatch} from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './reducer';
import {PreloadedReduxState} from './state';


export const createStore = (preloadedState?: PreloadedReduxState) => configureStore({
  reducer: rootReducer,
  devTools: true,
  preloadedState,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        // https://github.com/rt2zz/redux-persist/issues/988#issuecomment-654875104
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(thunk);
  },
});

export type ReduxStore = ReturnType<typeof createStore>;

export type Dispatcher = ReduxStore['dispatch'];

/**
 * Return the dispatch function which dispatches an action (both sync or async).
 * @return {never}
 */
export const useDispatch: () => Dispatcher = () => useReduxDispatch<Dispatcher>();

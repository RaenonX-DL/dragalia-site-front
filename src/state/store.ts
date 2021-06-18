import {configureStore} from '@reduxjs/toolkit';
import {useDispatch as useReduxDispatch} from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './reducer';
import {Dispatcher, PreloadedReduxState} from './types';


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

export const useDispatch: () => Dispatcher = () => useReduxDispatch<Dispatcher>();

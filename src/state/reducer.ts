import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import alertReducer from './alert/reducer';

// WARNING: DO NOT use redux for Google user ID storage
// because service cannot access redux contents
// while it requires the user ID to get the correct page meta.

const reducers = {
  alert: alertReducer,
};

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: Object.keys(reducers),
};

const rootReducer = combineReducers(reducers);

export default persistReducer(persistConfig, rootReducer);

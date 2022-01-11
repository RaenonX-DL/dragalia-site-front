import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';

import alertReducer from './alert/reducer';
import backupReducer from './backup/reducer';
import layoutReducer from './layout/reducer';
import storage from './storage';


const reducers = {
  alert: alertReducer,
  backup: backupReducer,
  layout: layoutReducer,
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: Object.keys(reducers),
};

const rootReducer = combineReducers(reducers);

export default persistReducer(persistConfig, rootReducer);

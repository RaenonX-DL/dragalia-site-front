import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';

import alertReducer from './alert/reducer';
import backupReducer from './backup/reducer';
import storage from './storage';


const reducers = {
  alert: alertReducer,
  backup: backupReducer,
};

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: Object.keys(reducers),
};

const rootReducer = combineReducers(reducers);

export default persistReducer(persistConfig, rootReducer);

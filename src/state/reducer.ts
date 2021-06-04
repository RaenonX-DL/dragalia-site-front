import {combineReducers} from 'redux';

import alertReducer from './alert/reducer';

// FIXME: Check alert still displays
const reducers = {
  alert: alertReducer,
};

export default combineReducers(reducers);

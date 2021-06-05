import {combineReducers} from 'redux';

import alertReducer from './alert/reducer';

// FIXME: Check alert is working after update
const reducers = {
  alert: alertReducer,
};

export default combineReducers(reducers);

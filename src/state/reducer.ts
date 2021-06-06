import {combineReducers} from 'redux';

import alertReducer from './alert/reducer';

// FIXME: Redux persist - alert fadeout on timeout
const reducers = {
  alert: alertReducer,
};

export default combineReducers(reducers);

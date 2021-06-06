import {createSlice} from '@reduxjs/toolkit';

import {AlertData} from './data';
import {alertDispatchers} from './dispatchers';
import {ALERT_STATE_NAME, AlertDispatcherName} from './name';
import {AlertState} from './state';


export const alertCloseReducer = (state: AlertData) => {
  state.message = '';
  state.show = false;
};

const initialState: AlertState = {
  message: '',
  variant: '',
  show: false,
};

const alertSlice = createSlice({
  name: ALERT_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Show the alert
    builder.addCase(alertDispatchers[AlertDispatcherName.SHOW_ALERT], (state, {payload}) => {
      state.message = payload.message;
      state.variant = payload.variant;
      state.show = true;
    });
    // Action on alert closed
    builder.addCase(alertDispatchers[AlertDispatcherName.ALERT_CLOSED], alertCloseReducer);
  },
});

export default alertSlice.reducer;

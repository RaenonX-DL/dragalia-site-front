import {createSlice} from '@reduxjs/toolkit';

import {alertDispatchers} from './dispatchers';
import {ALERT_STATE_NAME, AlertData, AlertDispatcherName, AlertState} from './types';


const initialState: AlertState = {
  message: '',
  variant: '',
};

export const alertShowReducer = (state: AlertData, {payload}: {payload: AlertData}) => {
  state.message = payload.message;
  state.variant = payload.variant;
};

export const alertCloseReducer = (state: AlertData) => {
  state.message = '';
  state.variant = '';
};

const alertSlice = createSlice({
  name: ALERT_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(alertDispatchers[AlertDispatcherName.SHOW_ALERT], alertShowReducer);
    builder.addCase(alertDispatchers[AlertDispatcherName.ALERT_CLOSED], alertCloseReducer);
  },
});

export default alertSlice.reducer;

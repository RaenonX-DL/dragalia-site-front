import {createSlice} from '@reduxjs/toolkit';

import {layoutDispatchers} from './dispatchers';
import {LAYOUT_STATE_NAME, LayoutData, LayoutDispatcherName, LayoutDataState} from './types';


const initialState: LayoutDataState = {
  collapse: false,
  fluid: true,
};

export const changeCollapseReducer = (
  key: keyof LayoutDataState,
) => (
  state: LayoutData, {payload}: {payload: boolean},
) => {
  state[key] = payload;
};

const layoutSlice = createSlice({
  name: LAYOUT_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(layoutDispatchers[LayoutDispatcherName.CHANGE_FLUID], changeCollapseReducer('fluid'));
    builder.addCase(layoutDispatchers[LayoutDispatcherName.CHANGE_COLLAPSE], changeCollapseReducer('collapse'));
  },
});

export default layoutSlice.reducer;

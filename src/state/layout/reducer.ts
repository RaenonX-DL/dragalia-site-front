import {createSlice} from '@reduxjs/toolkit';

import {layoutDispatchers} from './dispatchers';
import {LAYOUT_STATE_NAME, LayoutData, LayoutDataState, LayoutDispatcherName, LayoutWidthType} from './types';


const initialState: LayoutDataState = {
  collapse: false,
  width: 'full',
};

export const changeCollapseReducer = (state: LayoutData, {payload}: {payload: boolean}) => {
  state.collapse = payload;
};

export const changeWidthReducer = (state: LayoutData, {payload}: {payload: LayoutWidthType}) => {
  state.width = payload;
};

const layoutSlice = createSlice({
  name: LAYOUT_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(layoutDispatchers[LayoutDispatcherName.CHANGE_COLLAPSE], changeCollapseReducer);
    builder.addCase(layoutDispatchers[LayoutDispatcherName.CHANGE_WIDTH], changeWidthReducer);
  },
});

export default layoutSlice.reducer;

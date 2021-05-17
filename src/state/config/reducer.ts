import {createSlice} from '@reduxjs/toolkit';

import {detectLanguage} from '../../i18n/detectors';
import {configDispatchers} from './dispatchers';
import {CONFIG_STATE_NAME, ConfigDispatcherName} from './name';
import {ConfigState} from './state';

const initialState: ConfigState = {
  lang: detectLanguage(),
};

const configSlice = createSlice({
  name: CONFIG_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Set config
    builder.addCase(configDispatchers[ConfigDispatcherName.SET_CONFIG], (state, {payload}) => {
      state.lang = payload.lang;
    });
  },
});

export default configSlice.reducer;

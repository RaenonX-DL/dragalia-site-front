import {createSlice} from '@reduxjs/toolkit';

import {backupDispatchers} from './dispatchers';
import {BACKUP_STATE_NAME, BackupDispatcherName, BackupState} from './types';


const initialState: BackupState = {
  analysis: {
    chara: null,
    dragon: null,
  },
  quest: null,
  misc: null,
};

export const backupCharaReducer = (state: BackupState, {payload}: {payload: BackupState['analysis']['chara']}) => {
  state.analysis.chara = payload;
};

export const backupDragonReducer = (state: BackupState, {payload}: {payload: BackupState['analysis']['dragon']}) => {
  state.analysis.dragon = payload;
};

export const backupQuestReducer = (state: BackupState, {payload}: {payload: BackupState['quest']}) => {
  state.quest = payload;
};

export const backupMiscReducer = (state: BackupState, {payload}: {payload: BackupState['misc']}) => {
  state.misc = payload;
};

export const clearCharaReducer = (state: BackupState) => {
  state.analysis.chara = null;
};

export const clearDragonReducer = (state: BackupState) => {
  state.analysis.dragon = null;
};

export const clearQuestReducer = (state: BackupState) => {
  state.quest = null;
};

export const clearMiscReducer = (state: BackupState) => {
  state.misc = null;
};

const backupSlice = createSlice({
  name: BACKUP_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(backupDispatchers[BackupDispatcherName.BACKUP_CHARA_ANALYSIS], backupCharaReducer);
    builder.addCase(backupDispatchers[BackupDispatcherName.BACKUP_DRAGON_ANALYSIS], backupDragonReducer);
    builder.addCase(backupDispatchers[BackupDispatcherName.BACKUP_QUEST_GUIDE], backupQuestReducer);
    builder.addCase(backupDispatchers[BackupDispatcherName.BACKUP_MISC_POST], backupMiscReducer);
    builder.addCase(backupDispatchers[BackupDispatcherName.CLEAR_CHARA_ANALYSIS], clearCharaReducer);
    builder.addCase(backupDispatchers[BackupDispatcherName.CLEAR_DRAGON_ANALYSIS], clearDragonReducer);
    builder.addCase(backupDispatchers[BackupDispatcherName.CLEAR_QUEST_GUIDE], clearQuestReducer);
    builder.addCase(backupDispatchers[BackupDispatcherName.CLEAR_MISC_POST], clearMiscReducer);
  },
});

export default backupSlice.reducer;

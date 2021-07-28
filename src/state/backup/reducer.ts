import {createSlice} from '@reduxjs/toolkit';

import {CharaAnalysisPublishPayload, DragonAnalysisPublishPayload, QuestPostPublishPayload} from '../../api-def/api';
import {backupDispatchers} from './dispatchers';
import {BACKUP_STATE_NAME, BackupDispatcherName, BackupState} from './types';


const initialState: BackupState = {
  analysis: {
    chara: null,
    dragon: null,
  },
  quest: null,
};

export const backupCharaReducer = (state: BackupState, {payload}: {payload: CharaAnalysisPublishPayload}) => {
  state.analysis.chara = payload;
};

export const backupDragonReducer = (state: BackupState, {payload}: {payload: DragonAnalysisPublishPayload}) => {
  state.analysis.dragon = payload;
};

export const backupQuestReducer = (state: BackupState, {payload}: {payload: QuestPostPublishPayload}) => {
  state.quest = payload;
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

const backupSlice = createSlice({
  name: BACKUP_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(backupDispatchers[BackupDispatcherName.BACKUP_CHARA_ANALYSIS], backupCharaReducer);
    builder.addCase(backupDispatchers[BackupDispatcherName.BACKUP_DRAGON_ANALYSIS], backupDragonReducer);
    builder.addCase(backupDispatchers[BackupDispatcherName.BACKUP_QUEST_GUIDE], backupQuestReducer);
    builder.addCase(backupDispatchers[BackupDispatcherName.CLEAR_CHARA_ANALYSIS], clearCharaReducer);
    builder.addCase(backupDispatchers[BackupDispatcherName.CLEAR_DRAGON_ANALYSIS], clearDragonReducer);
    builder.addCase(backupDispatchers[BackupDispatcherName.CLEAR_QUEST_GUIDE], clearQuestReducer);
  },
});

export default backupSlice.reducer;

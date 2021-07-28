import {createAction} from '@reduxjs/toolkit';

import {CharaAnalysisPublishPayload, DragonAnalysisPublishPayload, QuestPostPublishPayload} from '../../api-def/api';
import {BackupDispatcherName} from './types';


export const backupDispatchers = {
  [BackupDispatcherName.BACKUP_CHARA_ANALYSIS]:
    createAction<CharaAnalysisPublishPayload>(BackupDispatcherName.BACKUP_CHARA_ANALYSIS),
  [BackupDispatcherName.BACKUP_DRAGON_ANALYSIS]:
    createAction<DragonAnalysisPublishPayload>(BackupDispatcherName.BACKUP_DRAGON_ANALYSIS),
  [BackupDispatcherName.BACKUP_QUEST_GUIDE]:
    createAction<QuestPostPublishPayload>(BackupDispatcherName.BACKUP_QUEST_GUIDE),
  [BackupDispatcherName.CLEAR_CHARA_ANALYSIS]:
    createAction(BackupDispatcherName.CLEAR_CHARA_ANALYSIS),
  [BackupDispatcherName.CLEAR_DRAGON_ANALYSIS]:
    createAction(BackupDispatcherName.CLEAR_DRAGON_ANALYSIS),
  [BackupDispatcherName.CLEAR_QUEST_GUIDE]:
    createAction(BackupDispatcherName.CLEAR_QUEST_GUIDE),
};

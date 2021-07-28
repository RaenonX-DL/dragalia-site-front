import {createAction} from '@reduxjs/toolkit';

import {BackupDispatcherName, BackupState} from './types';


export const backupDispatchers = {
  [BackupDispatcherName.BACKUP_CHARA_ANALYSIS]:
    createAction<BackupState['analysis']['chara']>(BackupDispatcherName.BACKUP_CHARA_ANALYSIS),
  [BackupDispatcherName.BACKUP_DRAGON_ANALYSIS]:
    createAction<BackupState['analysis']['dragon']>(BackupDispatcherName.BACKUP_DRAGON_ANALYSIS),
  [BackupDispatcherName.BACKUP_QUEST_GUIDE]:
    createAction<BackupState['quest']>(BackupDispatcherName.BACKUP_QUEST_GUIDE),
  [BackupDispatcherName.CLEAR_CHARA_ANALYSIS]:
    createAction(BackupDispatcherName.CLEAR_CHARA_ANALYSIS),
  [BackupDispatcherName.CLEAR_DRAGON_ANALYSIS]:
    createAction(BackupDispatcherName.CLEAR_DRAGON_ANALYSIS),
  [BackupDispatcherName.CLEAR_QUEST_GUIDE]:
    createAction(BackupDispatcherName.CLEAR_QUEST_GUIDE),
};

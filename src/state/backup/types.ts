import {CharaAnalysisPublishPayload, DragonAnalysisPublishPayload, QuestPostPublishPayload} from '../../api-def/api';
import {StateBase} from '../types';


export const BACKUP_STATE_NAME = 'backup';

export enum BackupDispatcherName {
  BACKUP_CHARA_ANALYSIS = 'backupCharaAnalysis',
  BACKUP_DRAGON_ANALYSIS = 'backupDragonAnalysis',
  BACKUP_QUEST_GUIDE = 'backupQuestGuide',
  CLEAR_CHARA_ANALYSIS = 'clearCharaAnalysis',
  CLEAR_DRAGON_ANALYSIS = 'clearDragonAnalysis',
  CLEAR_QUEST_GUIDE = 'clearQuestGuide',
}

export type BackupData = {
  analysis: {
    chara: CharaAnalysisPublishPayload | null,
    dragon: DragonAnalysisPublishPayload | null,
  },
  quest: QuestPostPublishPayload | null,
}

export type BackupState = StateBase & BackupData;

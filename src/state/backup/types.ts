import {
  CharaAnalysisPublishPayload,
  DragonAnalysisPublishPayload,
  MiscPostPublishPayload,
  QuestPostPublishPayload,
} from '../../api-def/api';
import {StateBase} from '../types';


export const BACKUP_STATE_NAME = 'backup';

export enum BackupDispatcherName {
  BACKUP_CHARA_ANALYSIS = 'backupCharaAnalysis',
  BACKUP_DRAGON_ANALYSIS = 'backupDragonAnalysis',
  BACKUP_QUEST_GUIDE = 'backupQuestGuide',
  BACKUP_MISC_POST = 'backupMisc',
  CLEAR_CHARA_ANALYSIS = 'clearCharaAnalysis',
  CLEAR_DRAGON_ANALYSIS = 'clearDragonAnalysis',
  CLEAR_QUEST_GUIDE = 'clearQuestGuide',
  CLEAR_MISC_POST = 'clearMisc',
}

export type BackupData = {
  analysis: {
    chara: Omit<CharaAnalysisPublishPayload, 'uid'> | null,
    dragon: Omit<DragonAnalysisPublishPayload, 'uid'> | null,
  },
  quest: Omit<QuestPostPublishPayload, 'uid'> | null,
  misc: Omit<MiscPostPublishPayload, 'uid'> | null,
};

export type BackupState = StateBase & BackupData;

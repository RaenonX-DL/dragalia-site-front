import {QuestPostPublishPayload, SupportedLanguages} from '../../../../../api-def/api';
import {generateNewPositionInfo} from '../../../../../utils/services/api/utils';


export const generatePayload = (lang: SupportedLanguages, uid?: string): QuestPostPublishPayload => ({
  uid: uid || '',
  lang,
  title: '',
  video: '',
  general: '',
  positional: [
    generateNewPositionInfo(),
  ],
  addendum: '',
});

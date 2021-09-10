import {MiscPostPublishPayload, SupportedLanguages} from '../../../../../api-def/api';


export const generatePayload = (lang: SupportedLanguages, uid?: string): MiscPostPublishPayload => ({
  uid: uid || '',
  lang,
  title: '',
  sections: [{
    title: '',
    content: '',
  }],
});

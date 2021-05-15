import {SupportedLanguages, UserShowAdsResponse} from '../../../src/api-def/api';
import {translations} from '../../../src/i18n/translations/main';
import {getTranslationString} from '../../../src/i18n/utils';
import {ADS_CLIENT} from '../../const';


export type PageMetaResponse = UserShowAdsResponse;

export const replaceHtmlContent = (html: string, pageMetaResponse: PageMetaResponse): string => {
  // Page title
  // TEMP: Title and description - build production and test this feature
  const currentLang = SupportedLanguages.EN;
  const getTrans = getTranslationString(translations[currentLang]);

  html = html.replace(/__META_TITLE__/gim, getTrans((t) => t.pages.name.site));

  html = html.replace(/__META_DESCRIPTION__/gim, 'dummy description');

  // Page description

  // Ads client ID
  if (pageMetaResponse.showAds) {
    html = html.replace(/__AD_CLIENT__/gim, ADS_CLIENT);
  }

  return html;
};

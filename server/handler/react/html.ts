import {isMetaResponseFailure} from '../../../src/utils/path/utils';
import {ADS_CLIENT} from '../../const';
import {getTranslations} from '../../utils/meta/main';


export const replaceHtmlContent = async (googleUid: string, currentUrl: string, html: string): Promise<string> => {
  const {title, description, metaResponse} = await getTranslations(googleUid, currentUrl);

  html = html.replace(/__META_TITLE__/gim, title);

  html = html.replace(/__META_DESCRIPTION__/gim, description);

  // Page description

  // Attach ads client ID for showing the ads
  if (isMetaResponseFailure(metaResponse) || metaResponse.showAds) {
    html = html.replace(/__AD_CLIENT__/gim, ADS_CLIENT);
  }

  return html;
};

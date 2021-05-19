import {SupportedLanguages} from '../../../src/api-def/api/other/lang';
import {ApiResponseCode} from '../../../src/api-def/api/responseCode';
import {GeneralPath} from '../../../src/const/path/definitions';
import {makeSimplePath} from '../../../src/utils/path/make';
import {ADS_CLIENT} from '../../const';
import * as utils from '../../utils/meta/main';
import {replaceHtmlContent} from './html';

describe('Replace HTML content', () => {
  const uidShowAds = 'showAds';
  const uidHideAds = 'hideAds';

  const title = 'title';
  const description = 'description';

  beforeAll(() => {
    jest.spyOn(utils, 'getTranslations').mockImplementation(async (googleUid: string) => {
      return {
        title,
        description,
        metaResponse: {
          code: ApiResponseCode.SUCCESS,
          success: true,
          showAds: googleUid === uidShowAds,
          isAdmin: true,
          params: {},
        },
      };
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('replaces title and description', async () => {
    const lang = SupportedLanguages.CHT;

    const replacedHtml = await replaceHtmlContent(
      uidShowAds,
      makeSimplePath(GeneralPath.QUEST_LIST, {lang}),
      '__META_TITLE__ / __META_DESCRIPTION__',
    );

    expect(replacedHtml).toBe(`${title} / ${description}`);
  });

  it('shows ads as needed', async () => {
    const lang = SupportedLanguages.CHT;

    const replacedHtml = await replaceHtmlContent(
      uidShowAds,
      makeSimplePath(GeneralPath.QUEST_LIST, {lang}),
      '__AD_CLIENT__',
    );

    expect(replacedHtml).toBe(ADS_CLIENT);
  });

  it('hides ads as needed', async () => {
    const lang = SupportedLanguages.CHT;

    const replacedHtml = await replaceHtmlContent(
      uidHideAds,
      makeSimplePath(GeneralPath.QUEST_LIST, {lang}),
      '__AD_CLIENT__',
    );

    expect(replacedHtml).toBe('__AD_CLIENT__');
  });
});

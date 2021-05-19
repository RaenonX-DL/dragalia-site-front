import {generatePath} from 'react-router-dom';

import {
  ApiResponseCode,
  PageMetaResponse,
  PostPageMetaResponse,
  PostType,
  SupportedLanguages,
} from '../../../src/api-def/api';
import {GeneralPath, PostPath} from '../../../src/const/path/definitions';
import {DEFAULT_LANG} from '../../../src/i18n/langCode';
import {translation as translationCHT} from '../../../src/i18n/translations/cht/translation';
import {translation as translationEN} from '../../../src/i18n/translations/en/translation';
import {translations} from '../../../src/i18n/translations/main';
import {getTFunction} from '../../../src/i18n/utils';
import {makePostPath, makeSimplePath} from '../../../src/utils/path/make';
import {ApiRequestSender} from '../../../src/utils/services/api/requestSender';
import {getTranslations} from './main';

describe('Get meta translations', () => {
  const getTitle = (pid: number, lang: SupportedLanguages) => {
    return `#${pid}-${lang}`;
  };

  const getDescription = (pid: number) => {
    return `${pid}`;
  };

  beforeAll(() => {
    jest.spyOn(ApiRequestSender, 'getPageMeta').mockImplementation(async (): Promise<PageMetaResponse> => ({
      code: ApiResponseCode.SUCCESS,
      success: true,
      isAdmin: true,
      showAds: true,
      params: {},
    }));
    jest.spyOn(ApiRequestSender, 'getPostMeta').mockImplementation(async (
      googleUid: string,
      lang: SupportedLanguages,
      postType: PostType,
      pid: number,
    ): Promise<PostPageMetaResponse> => ({
      code: ApiResponseCode.SUCCESS,
      success: true,
      isAdmin: true,
      showAds: true,
      params: {
        title: getTitle(pid, lang),
        description: getDescription(pid),
      },
    }));
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('returns correct meta for home page', async () => {
    const meta = await getTranslations(
      '',
      makeSimplePath(GeneralPath.HOME, {lang: SupportedLanguages.CHT}),
    );

    expect(meta.title).toBe(translationCHT.meta.inUse.home.title + translationCHT.meta.suffix);
    expect(meta.description).toBe(translationCHT.meta.inUse.home.description);
  });

  it('patches default language to general path', async () => {
    const meta = await getTranslations(
      '',
      GeneralPath.HOME,
    );

    expect(meta.title).toBe(translationCHT.meta.inUse.home.title + translationCHT.meta.suffix);
    expect(meta.description).toBe(translationCHT.meta.inUse.home.description);
  });

  it('patches default language to post path', async () => {
    const pid = 37;

    const meta = await getTranslations(
      '',
      generatePath(PostPath.ANALYSIS, {pid: 37}),
    );

    expect(meta.title)
      .toBe(
        getTFunction(translationCHT)(
          (t) => t.meta.inUse.analysisPost.title,
          {title: getTitle(pid, SupportedLanguages.CHT)},
        ) +
        translationCHT.meta.suffix,
      );
    expect(meta.description)
      .toBe(getTFunction(translationCHT)(
        (t) => t.meta.inUse.analysisPost.description,
        {description: getDescription(pid)},
      ));
  });

  it('returns correct meta for analysis', async () => {
    const pid = 37;
    const lang = SupportedLanguages.EN;

    const meta = await getTranslations(
      '',
      makePostPath(PostPath.ANALYSIS, {pid, lang}),
    );

    expect(meta.title)
      .toBe(
        getTFunction(translationEN)(
          (t) => t.meta.inUse.analysisPost.title,
          {title: getTitle(pid, lang)},
        ) +
        translationEN.meta.suffix,
      );
    expect(meta.description)
      .toBe(getTFunction(translationEN)(
        (t) => t.meta.inUse.analysisPost.description,
        {description: getDescription(pid)},
      ));
  });

  it('returns 404 for URL without lang', async () => {
    const meta = await getTranslations(
      '',
      '/i-am-invalid',
    );

    expect(meta.title).toBe(translationCHT.meta.error['404'].title + translationCHT.meta.suffix);
    expect(meta.description).toBe(translationCHT.meta.error['404'].description);
  });

  it('returns 404 for invalid path with valid lang', async () => {
    const meta = await getTranslations(
      '',
      `/${SupportedLanguages.EN}/i-am-invalid`,
    );

    expect(meta.title).toBe(translationEN.meta.error['404'].title + translationEN.meta.suffix);
    expect(meta.description).toBe(translationEN.meta.error['404'].description);
  });

  it('returns 404 for invalid path with invalid lang', async () => {
    const meta = await getTranslations(
      '',
      `/lang/i-am-invalid`,
    );

    expect(meta.title).toBe(translations[DEFAULT_LANG].meta.error['404'].title + translationCHT.meta.suffix);
    expect(meta.description).toBe(translations[DEFAULT_LANG].meta.error['404'].description);
  });

  it('returns 404 for post not exists', async () => {
    jest.spyOn(ApiRequestSender, 'getPostMeta').mockImplementationOnce(async () => ({
      code: ApiResponseCode.FAILED_POST_NOT_EXISTS,
      success: false,
      isAdmin: false,
      showAds: true,
      params: {},
    }));

    const meta = await getTranslations(
      '',
      makePostPath(PostPath.ANALYSIS, {pid: 37, lang: SupportedLanguages.EN}),
    );

    expect(meta.title).toBe(translationEN.meta.error['404'].title + translationEN.meta.suffix);
    expect(meta.description).toBe(translationEN.meta.error['404'].description);
  });

  it('returns error code for non-post-not-exists error', async () => {
    jest.spyOn(ApiRequestSender, 'getPostMeta').mockImplementationOnce(async () => ({
      code: ApiResponseCode.FAILED_INTERNAL_ERROR,
      success: false,
      isAdmin: false,
      showAds: true,
      params: {},
    }));

    const meta = await getTranslations(
      '',
      makePostPath(PostPath.ANALYSIS, {pid: 37, lang: SupportedLanguages.EN}),
    );

    expect(meta.title).toBe(ApiResponseCode[ApiResponseCode.FAILED_INTERNAL_ERROR]);
    expect(meta.description).toBe(ApiResponseCode[ApiResponseCode.FAILED_INTERNAL_ERROR]);
  });

  it('returns error code on API failure for general page', async () => {
    jest.spyOn(ApiRequestSender, 'getPageMeta').mockImplementationOnce(async () => ({
      code: ApiResponseCode.FAILED_INTERNAL_ERROR,
      success: false,
    }));

    const meta = await getTranslations(
      '',
      makeSimplePath(GeneralPath.EX, {lang: SupportedLanguages.EN}),
    );

    expect(meta.title).toBe(ApiResponseCode[ApiResponseCode.FAILED_INTERNAL_ERROR]);
    expect(meta.description).toBe(ApiResponseCode[ApiResponseCode.FAILED_INTERNAL_ERROR]);
  });
});

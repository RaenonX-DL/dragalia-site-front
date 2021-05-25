import {screen} from '@testing-library/react';
import * as router from 'react-router-dom';

import {renderApp} from '../test/render/main';
import {ApiResponseCode, SupportedLanguages} from './api-def/api';
import {GeneralPath, PostPath} from './const/path/definitions';
import {translation as translationCHT} from './i18n/translations/cht/translation';
import {translation as translationEN} from './i18n/translations/en/translation';
import {makePostPath, makeSimplePath} from './utils/path/make';
import {ApiRequestSender} from './utils/services/api/requestSender';
import {GoogleAnalytics} from './utils/services/ga';

describe('Page browsing behavior', () => {
  // According to gtag doc, parameter `page_path` for page view must start with `/`
  // Reference: https://developers.google.com/analytics/devguides/collection/gtagjs/pages#default_behavior

  let pageViewFunction: jest.SpyInstance;
  let pageViewFailedFunction: jest.SpyInstance;

  beforeEach(() => {
    pageViewFunction = jest.spyOn(GoogleAnalytics, 'pageView');
    pageViewFailedFunction = jest.spyOn(GoogleAnalytics, 'pageViewFailed');
    jest.spyOn(ApiRequestSender, 'sendRequest').mockImplementation(async () => Promise.resolve({
      code: ApiResponseCode.SUCCESS,
      success: true,
    }));
  });

  test('general path with language rendered', async () => {
    const path = makeSimplePath(GeneralPath.HOME, {lang: SupportedLanguages.CHT});
    await renderApp(path);

    expect(screen.getAllByText(/OM/).length).toBe(3);
    expect(pageViewFunction).toHaveBeenCalledTimes(1);

    const viewFuncArg0 = pageViewFunction.mock.calls[0][0];
    expect(viewFuncArg0.startsWith('/')).toBeTruthy();
    expect(viewFuncArg0.endsWith(path)).toBeTruthy();
  });

  test('general path without language redirected and rendered', async () => {
    const path = GeneralPath.HOME;
    await renderApp(path);

    expect(screen.getAllByText(/OM/).length).toBe(3);
    expect(pageViewFunction).toHaveBeenCalledTimes(1);

    const viewFuncArg0 = pageViewFunction.mock.calls[0][0];
    expect(viewFuncArg0.startsWith('/')).toBeTruthy();
    expect(viewFuncArg0.endsWith(path)).toBeTruthy();
  });

  test('post path with language rendered', async () => {
    const path = makePostPath(PostPath.ANALYSIS, {pid: 1, lang: SupportedLanguages.CHT});
    await renderApp(path);

    expect(screen.queryByText(translationCHT.meta.error['404'].description)).not.toBeInTheDocument();
    expect(pageViewFunction).toHaveBeenCalledTimes(1);

    const viewFuncArg0 = pageViewFunction.mock.calls[0][0];
    expect(viewFuncArg0.startsWith('/')).toBeTruthy();
    expect(viewFuncArg0.endsWith(path)).toBeTruthy();
  });

  test('post path without language redirected and rendered', async () => {
    const path = router.generatePath(PostPath.ANALYSIS, {pid: 1});
    await renderApp(path);

    expect(screen.queryByText(translationEN.meta.error['404'].description)).not.toBeInTheDocument();
    expect(pageViewFunction).toHaveBeenCalledTimes(1);

    const viewFuncArg0 = pageViewFunction.mock.calls[0][0];
    expect(viewFuncArg0.startsWith('/')).toBeTruthy();
    expect(viewFuncArg0.endsWith(path)).toBeTruthy();
  });

  test('non-existent page without language should return 404', async () => {
    const path = '/aa';
    await renderApp(path);

    expect(screen.getByText(translationEN.meta.error['404'].description)).toBeInTheDocument();
    expect(pageViewFunction).toHaveBeenCalledTimes(0);
    expect(pageViewFailedFunction).toHaveBeenCalledTimes(1);
    expect(pageViewFailedFunction).toHaveBeenCalledWith('not_found', path);
  });

  test('non-existent page with language should return 404', async () => {
    const path = `/${SupportedLanguages.CHT}/aa`;
    await renderApp(path);

    expect(screen.getByText(translationCHT.meta.error['404'].description)).toBeInTheDocument();
    expect(pageViewFunction).toHaveBeenCalledTimes(0);
    expect(pageViewFailedFunction).toHaveBeenCalledTimes(1);
    expect(pageViewFailedFunction).toHaveBeenCalledWith('not_found', path);
  });
});

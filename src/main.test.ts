import * as router from 'react-router-dom';

import {renderApp} from '../test/render/main';
import {SupportedLanguages} from './api-def/api/other/lang';
import {AnalysisOutput} from './components/elements';
import {Home} from './components/pages';
import {Error404} from './components/pages/404';
import {GeneralPath, PostPath} from './const/path/definitions';
import {makePostPath, makeSimplePath} from './utils/path/make';
import {GoogleAnalytics} from './utils/services/ga';

describe('Page browsing behavior', () => {
  // According to gtag doc, parameter `page_path` for page view must start with `/`
  // Reference: https://developers.google.com/analytics/devguides/collection/gtagjs/pages#default_behavior

  let pageViewFunction: jest.SpyInstance;
  let pageViewFailedFunction: jest.SpyInstance;

  beforeEach(() => {
    // Somehow `beforeAll` will invalidate the implementations of `mockImplementation`
    pageViewFunction = jest.spyOn(GoogleAnalytics, 'pageView');
    pageViewFailedFunction = jest.spyOn(GoogleAnalytics, 'pageViewFailed');
  });

  test('general path with language rendered', async () => {
    const path = makeSimplePath(GeneralPath.HOME, {lang: SupportedLanguages.CHT});
    const {app} = await renderApp(path);

    expect(app.find(Home).exists()).toBeTruthy();
    expect(app.find(Error404).exists()).toBeFalsy();
    expect(pageViewFunction).toHaveBeenCalledTimes(1);

    const viewFuncArg0 = pageViewFunction.mock.calls[0][0];
    expect(viewFuncArg0.startsWith('/')).toBeTruthy();
    expect(viewFuncArg0.endsWith(path)).toBeTruthy();
  });

  test('general path without language redirected and rendered', async () => {
    const path = GeneralPath.HOME;
    const {app} = await renderApp(path);

    expect(app.find(Home).exists()).toBeTruthy();
    expect(app.find(Error404).exists()).toBeFalsy();
    expect(pageViewFunction).toHaveBeenCalledTimes(1);

    const viewFuncArg0 = pageViewFunction.mock.calls[0][0];
    expect(viewFuncArg0.startsWith('/')).toBeTruthy();
    expect(viewFuncArg0.endsWith(path)).toBeTruthy();
  });

  test('post path with language rendered', async () => {
    const path = makePostPath(PostPath.ANALYSIS, {pid: 1, lang: SupportedLanguages.CHT});
    const {app} = await renderApp(path);

    expect(app.find(AnalysisOutput).exists()).toBeTruthy();
    expect(app.find(Error404).exists()).toBeFalsy();
    expect(pageViewFunction).toHaveBeenCalledTimes(1);

    const viewFuncArg0 = pageViewFunction.mock.calls[0][0];
    expect(viewFuncArg0.startsWith('/')).toBeTruthy();
    expect(viewFuncArg0.endsWith(path)).toBeTruthy();
  });

  test('post path without language redirected and rendered', async () => {
    const path = router.generatePath(PostPath.ANALYSIS, {pid: 1});
    const {app} = await renderApp(path);

    expect(app.find(AnalysisOutput).exists()).toBeTruthy();
    expect(app.find(Error404).exists()).toBeFalsy();
    expect(pageViewFunction).toHaveBeenCalledTimes(1);

    const viewFuncArg0 = pageViewFunction.mock.calls[0][0];
    expect(viewFuncArg0.startsWith('/')).toBeTruthy();
    expect(viewFuncArg0.endsWith(path)).toBeTruthy();
  });

  test('non-existent page without language should return 404', async () => {
    const path = '/aa';
    const {app} = await renderApp(path);

    expect(app.find(Error404).exists()).toBeTruthy();
    expect(pageViewFunction).toHaveBeenCalledTimes(0);
    expect(pageViewFailedFunction).toHaveBeenCalledTimes(1);
    expect(pageViewFailedFunction).toHaveBeenCalledWith('not_found', path);
  });

  test('non-existent page with language should return 404', async () => {
    const path = `/${SupportedLanguages.CHT}/aa`;
    const {app} = await renderApp(path);

    expect(app.find(Error404).exists()).toBeTruthy();
    expect(pageViewFunction).toHaveBeenCalledTimes(0);
    expect(pageViewFailedFunction).toHaveBeenCalledTimes(1);
    expect(pageViewFailedFunction).toHaveBeenCalledWith('not_found', path);
  });
});

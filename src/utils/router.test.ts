import {renderReactHook} from '../../test/render/main';
import {useNextRouter} from './router';

describe('Next.js router wrapper', () => {
  it('removes `lang` from pathname', async () => {
    const {result} = renderReactHook(
      () => useNextRouter(),
      {routerOptions: {query: {lang: 'cht'}, pathname: '/[lang]/quest'}},
    );

    expect(result.current.pathnameNoLang).toBe('/quest');
  });

  it('returns correct `lang`', async () => {
    const {result} = renderReactHook(
      () => useNextRouter(),
      {routerOptions: {query: {lang: 'cht'}, pathname: '/cht/quest'}},
    );

    expect(result.current.lang).toBe('cht');
  });

  it('prepends the URL (string) to push with `lang`', async () => {
    const fnPush = jest.fn();

    const {result} = renderReactHook(
      () => useNextRouter(),
      {routerOptions: {query: {lang: 'cht'}, push: fnPush}},
    );

    await result.current.push('/quest');

    expect(fnPush).toHaveBeenCalledWith('/cht/quest', undefined, undefined);
  });

  it('prepends the URL (UrlObject) to push with `lang`', async () => {
    const fnPush = jest.fn();

    const {result} = renderReactHook(
      () => useNextRouter(),
      {routerOptions: {query: {lang: 'cht'}, push: fnPush}},
    );

    await result.current.push({pathname: '/quest'});

    expect(fnPush).toHaveBeenCalledWith({pathname: '/cht/quest'}, undefined, undefined);
  });
});

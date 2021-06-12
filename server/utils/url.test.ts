// noinspection JSDeprecatedSymbols

import {parse} from 'url';

import {urlObjectToLegacy} from './url';


describe('URL converter', () => {
  it('converts root path', async () => {
    const baseUrl = 'http://localhost:3000';
    const path = '/';

    const converted = urlObjectToLegacy(new URL(path, baseUrl), {});
    const expected = parse(`${baseUrl}${path}`, true);

    expect(converted).toEqual(expected);
  });

  it('converts path with single depth', async () => {
    const baseUrl = 'http://localhost:3000';
    const path = '/api';

    const converted = urlObjectToLegacy(new URL(path, baseUrl), {});
    const expected = parse(`${baseUrl}${path}`, true);

    expect(converted).toEqual(expected);
  });

  it('converts path with single depth and post-fixed slash', async () => {
    const baseUrl = 'http://localhost:3000';
    const path = '/api/';

    const converted = urlObjectToLegacy(new URL(path, baseUrl), {});
    const expected = parse(`${baseUrl}${path}`, true);

    expect(converted).toEqual(expected);
  });

  it('converts path with hash', async () => {
    const baseUrl = 'http://localhost:3000';
    const path = '/page#skill';

    const converted = urlObjectToLegacy(new URL(path, baseUrl), {});
    const expected = parse(`${baseUrl}${path}`, true);

    expect(converted).toEqual(expected);
  });

  it('converts path with query', async () => {
    const baseUrl = 'http://localhost:3000';
    const path = '/page?a=b';

    const converted = urlObjectToLegacy(new URL(path, baseUrl), {});
    const expected = parse(`${baseUrl}${path}`, true);

    expect(converted).toEqual(expected);
  });

  it('converts path with hash and query', async () => {
    const baseUrl = 'http://localhost:3000';
    const path = '/page?a=b#c';

    const converted = urlObjectToLegacy(new URL(path, baseUrl), {});
    const expected = parse(`${baseUrl}${path}`, true);

    expect(converted).toEqual(expected);
  });

  it('converts file path', async () => {
    const baseUrl = 'http://localhost:3000';
    const path = '/aa/b.file.js';

    const converted = urlObjectToLegacy(new URL(path, baseUrl), {});
    const expected = parse(`${baseUrl}${path}`, true);

    expect(converted).toEqual(expected);
  });

  it('attaches additional query when path does not have query', async () => {
    const baseUrl = 'http://localhost:3000';
    const path = '/amo';

    const converted = urlObjectToLegacy(new URL(path, baseUrl), {lang: 'cht'});

    expect(converted.query).toEqual({lang: 'cht'});
  });

  it('attaches additional query when path has query', async () => {
    const baseUrl = 'http://localhost:3000';
    const path = '/amo?b=c';

    const converted = urlObjectToLegacy(new URL(path, baseUrl), {lang: 'cht'});

    expect(converted.query).toEqual({b: 'c', lang: 'cht'});
  });
});

import {SupportedLanguages} from '../../api-def/api';
import {GeneralPath} from '../../const/path/definitions';
import {DEFAULT_LANG} from '../../i18n/langCode';
import {makeGeneralUrl} from './make';
import {getLangFromQuery, makeLangUrl, mergePlaceholders, pathnameRemoveLang, urlRemoveLang} from './process';


describe('Remove prefixed language in URL', () => {
  it('returns root removes `/cht`', async () => {
    const processed = urlRemoveLang(`/${SupportedLanguages.CHT}`);
    expect(processed).toBe('/');
  });

  it('returns the leftovers after the removal', async () => {
    const processed = urlRemoveLang(`/${SupportedLanguages.CHT}/aaa`);
    expect(processed).toBe('/aaa');
  });

  it('leave the URL intact if the prefix is not a supported language', async () => {
    const processed = urlRemoveLang(`/b/aaa`);
    expect(processed).toBe('/b/aaa');
  });

  it('leaves the URl intact if the supported language is not the prefix', async () => {
    const processed = urlRemoveLang(`/b/${SupportedLanguages.CHT}/aaa`);
    expect(processed).toBe(`/b/${SupportedLanguages.CHT}/aaa`);
  });
});

describe('Remove `lang` prefix in path', () => {
  it('removes `[lang]` in pathname', async () => {
    const processedPath = pathnameRemoveLang('/[lang]/quest');
    expect(processedPath).toBe('/quest');
  });

  it('returns `/` if the path is empty after removing `[lang]`', async () => {
    const processedPath = pathnameRemoveLang('/[lang]');
    expect(processedPath).toBe('/');
  });

  it('puts the placeholders back', async () => {
    const processedPath = pathnameRemoveLang('/[lang]/quest/[pid]');
    expect(processedPath).toBe('/quest/[pid]');
  });

  it('returns the original path if `[lang]` is not present', async () => {
    const processedPath = pathnameRemoveLang('/quest');
    expect(processedPath).toBe('/quest');
  });

  it('returns the original path with placeholders', async () => {
    const processedPath = pathnameRemoveLang('/quest/[pid]');
    expect(processedPath).toBe('/quest/[pid]');
  });
});

describe('Extract `lang` from query', () => {
  it('extracts `lang` from query', async () => {
    const lang = getLangFromQuery({lang: SupportedLanguages.CHT});
    expect(lang).toBe(SupportedLanguages.CHT);
  });

  it('returns default lang if `lang` is invalid', async () => {
    const lang = getLangFromQuery({lang: 'aaa'});
    expect(lang).toBe(DEFAULT_LANG);
  });

  it('returns default lang if `lang` is not in query', async () => {
    const lang = getLangFromQuery({});
    expect(lang).toBe(DEFAULT_LANG);
  });
});

describe('Merge placeholders', () => {
  it('merges even if the placeholders is a subset of query keys', async () => {
    const merged = mergePlaceholders('/[lang]', {lang: 'aaa', other: 'bbb'});
    expect(merged).toBe('/aaa');
  });

  it('merges when placeholders is exactly query keys', async () => {
    const merged = mergePlaceholders('/[lang]/[other]', {lang: 'aaa', other: 'bbb'});
    expect(merged).toBe('/aaa/bbb');
  });

  it('merges even if query is empty', async () => {
    const merged = mergePlaceholders('/quest', {});
    expect(merged).toBe('/quest');
  });
});

describe('Make lang-sensitive URL', () => {
  it('makes URL from neutral path', async () => {
    const url = makeLangUrl(GeneralPath.HOME, SupportedLanguages.CHT);
    expect(url).toBe(makeGeneralUrl(GeneralPath.HOME, {lang: SupportedLanguages.CHT}));
  });

  it('disregards the language in `url`', async () => {
    const url = makeLangUrl(makeGeneralUrl(GeneralPath.HOME, {lang: SupportedLanguages.CHT}), SupportedLanguages.EN);
    expect(url).toBe(makeGeneralUrl(GeneralPath.HOME, {lang: SupportedLanguages.EN}));
  });
});

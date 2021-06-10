import {SupportedLanguages} from '../../api-def/api/other/lang';
import {DEFAULT_LANG} from '../../i18n/langCode';
import {getLangFromQuery, mergePlaceholders, pathnameRemoveLang} from './process';


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

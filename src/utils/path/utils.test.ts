import {generatePath} from 'react-router-dom';

import {SupportedLanguages} from '../../api-def/api';
import {GeneralPath, PostPath} from '../../const/path/definitions';
import {makePostPath, makeSimplePath, patchLanguageToPath} from './make';
import {getLangFromUrl, getNeutralPathFromUrl} from './utils';

describe('Get lang from URL', () => {
  it('returns the language in the path', () => {
    expect(getLangFromUrl('/cht/aaa')).toBe(SupportedLanguages.CHT);
  });

  it('maps the unsupported language to the default in the path', () => {
    expect(getLangFromUrl('/ssss/aaa')).toBe(SupportedLanguages.CHT);
  });

  it('returns the default language for the root path', () => {
    expect(getLangFromUrl('/')).toBe(SupportedLanguages.CHT);
  });

  it('returns the defined on-not-found object if not found', () => {
    expect(getLangFromUrl('/ssss/aaa', () => null)).toBeNull();
  });

  it('returns correctly even if on not found is defined', () => {
    expect(getLangFromUrl('/cht/aaa', () => null)).toBe(SupportedLanguages.CHT);
  });
});

describe('Get neutral path from URL', () => {
  it('returns null for clean path', () => {
    const {match, path} = getNeutralPathFromUrl('/');

    expect(match).toBeNull();
    expect(path).toBeNull();
  });

  it('returns null if the path is not a match', () => {
    const {match, path} = getNeutralPathFromUrl('/aa');

    expect(match).toBeNull();
    expect(path).toBeNull();
  });

  it('returns null if the path with language and other things is not a match', () => {
    const {match, path} = getNeutralPathFromUrl(`/${SupportedLanguages.CHT}/aaa`);

    expect(match).toBeNull();
    expect(path).toBeNull();
  });

  it('returns if the language only path is a match', () => {
    const {match, path} = getNeutralPathFromUrl(`/${SupportedLanguages.CHT}`);

    expect(match?.params.lang).toBe(SupportedLanguages.CHT);
    expect(path).toBe(GeneralPath.HOME);
  });

  it('returns if the language only path with trailing slash is a match', () => {
    const {match, path} = getNeutralPathFromUrl(`/${SupportedLanguages.CHT}/`);

    expect(match?.params.lang).toBe(SupportedLanguages.CHT);
    expect(path).toBe(GeneralPath.HOME);
  });

  it('returns if the path is a match', () => {
    const {match, path} = getNeutralPathFromUrl(`/${SupportedLanguages.CHT}${GeneralPath.EX}`);

    expect(match?.params.lang).toBe(SupportedLanguages.CHT);
    expect(path).toBe(GeneralPath.EX);
  });

  it('returns if the path with a trailing slash is a match', () => {
    const {match, path} = getNeutralPathFromUrl(`/${SupportedLanguages.CHT}${GeneralPath.EX}/`);

    expect(match?.params.lang).toBe(SupportedLanguages.CHT);
    expect(path).toBe(GeneralPath.EX);
  });
});


describe('Patch language to page path', () => {
  it('patches the language to a general path', () => {
    expect(patchLanguageToPath(GeneralPath.HOME, SupportedLanguages.CHT))
      .toBe(makeSimplePath(GeneralPath.HOME, {lang: SupportedLanguages.CHT}));
  });

  it('patches the language to a post path', () => {
    const lang = SupportedLanguages.CHT;
    const pid = 37;

    expect(patchLanguageToPath(generatePath(PostPath.ANALYSIS, {pid}), lang))
      .toBe(makePostPath(PostPath.ANALYSIS, {pid: 37, lang}));
  });

  it('skips patching if the language is already in the path', () => {
    const path = makeSimplePath(GeneralPath.HOME, {lang: SupportedLanguages.CHT});

    expect(patchLanguageToPath(path, SupportedLanguages.EN)).toBe(path);
  });
});

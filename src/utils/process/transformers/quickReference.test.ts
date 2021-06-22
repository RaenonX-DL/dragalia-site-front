import {SupportedLanguages} from '../../../api-def/api';
import {PostPath} from '../../../const/path/definitions';
import {translations} from '../../../i18n/translations/main';
import {makePostPath} from '../../path/make';
import * as unitInfoUtils from '../../services/resources/unitInfo/utils';
import {transformQuickReference} from './quickReference';


describe('Quick reference transformer', () => {
  const lang = SupportedLanguages.EN;

  beforeEach(() => {
    // Mocking this because the fetching promises in `getUnitNameIdMap()` do not resolve
    jest.spyOn(unitInfoUtils, 'getUnitNameIdMap').mockResolvedValue(new Map([
      ['Gala Mym', 10550101],
    ]));
  });

  it('transforms quest post link', async () => {
    const text = 'Quest post #Q1';

    const result = await transformQuickReference({text, lang});
    const expectedTitle = translations[lang].posts.quest.titleSelf;
    const expectedPath = makePostPath(PostPath.QUEST, {pid: 1, lang});
    const expectedText = `Quest post [${expectedTitle} #1](${expectedPath})`;
    expect(result).toBe(expectedText);
  });

  it('does not transform incomplete quest post link', async () => {
    const text = 'Quest post #Q';

    const result = await transformQuickReference({text, lang});

    expect(result).toBe(text);
  });

  it('transforms analysis link', async () => {
    const text = 'Gala Mym Analysis';

    const result = await transformQuickReference({text, lang});

    const expectedPath = makePostPath(PostPath.ANALYSIS, {pid: 10550101, lang});
    const expectedText = `[Gala Mym](${expectedPath}) Analysis`;
    expect(result).toBe(expectedText);
  });

  it('does not transform incomplete analysis link', async () => {
    const text = 'Gala Analysis';

    const result = await transformQuickReference({text, lang});

    expect(result).toBe(text);
  });

  it('transforms miscellaneous post link', async () => {
    const text = 'Miscellaneous post #M3';

    const result = await transformQuickReference({text, lang});

    const expectedTitle = translations[lang].posts.misc.titleSelf;
    const expectedPath = makePostPath(PostPath.MISC, {pid: 3, lang});
    const expectedText = `Miscellaneous post [${expectedTitle} #3](${expectedPath})`;
    expect(result).toBe(expectedText);
  });

  it('does not transform incomplete miscellaneous post link', async () => {
    const text = 'Miscellaneous post #M';

    const result = await transformQuickReference({text, lang});

    expect(result).toBe(text);
  });

  it('transforms all types of link at once', async () => {
    const text = 'Miscellaneous post #M3 Quest Post #Q1 Gala Mym Analysis';

    const result = await transformQuickReference({text, lang});

    const expectedMisc =
      `Miscellaneous post [${translations[lang].posts.misc.titleSelf} #3]` +
      `(${makePostPath(PostPath.MISC, {pid: 3, lang})})`;
    const expectedQuest =
      `Quest Post [${translations[lang].posts.quest.titleSelf} #1]` +
      `(${makePostPath(PostPath.QUEST, {pid: 1, lang})})`;
    const expectedAnalysis =
      `[Gala Mym](${makePostPath(PostPath.ANALYSIS, {pid: 10550101, lang})}) Analysis`;
    expect(result).toBe(`${expectedMisc} ${expectedQuest} ${expectedAnalysis}`);
  });

  it.todo('keeps already transformed references intact');
});

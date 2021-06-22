import {SupportedLanguages} from '../../api-def/api';
import {PostPath} from '../../const/path/definitions';
import {translations} from '../../i18n/translations/main';
import {makePostPath} from '../path/make';
import * as unitInfoUtils from '../services/resources/unitInfo/utils';
import {processText} from './text';

describe('Process text', () => {
  beforeEach(() => {
    // Mocking this because the fetching promises in `getUnitNameIdMap()` do not resolve
    jest.spyOn(unitInfoUtils, 'getUnitNameIdMap').mockResolvedValue(new Map([
      ['Gala Mym', 10550101],
    ]));
  });

  it('transforms all quick references at once', async () => {
    const text = 'Miscellaneous post #M3 Quest Post #Q1 Gala Mym Analysis';
    const lang = SupportedLanguages.EN;

    const result = await processText({text, lang});

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

  it('transforms empty string without error', async () => {
    const text = '';
    const lang = SupportedLanguages.EN;

    const result = await processText({text, lang});

    expect(result).toBe('');
  });

  it.todo('keeps already transformed references intact');
});

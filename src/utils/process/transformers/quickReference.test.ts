import {
  generateGalaMymInfo,
  generateHighBrunhildaInfo,
  generateBrunhildaInfo,
} from '../../../../test/data/mock/unitInfo';
import {SupportedLanguages} from '../../../api-def/api';
import {DepotPaths} from '../../../api-def/resources/paths';
import {PostPath} from '../../../const/path/definitions';
import {translations} from '../../../i18n/translations/main';
import {makePostPath} from '../../path/make';
import * as unitInfoUtils from '../../services/resources/unitInfo/utils';
import {transformQuickReference} from './quickReference';


const lang = SupportedLanguages.EN;

const galaMymAnalysisLink = `[Gala Mym](${makePostPath(PostPath.ANALYSIS, {pid: 10550101, lang})})`;
const galaMymImageMd = `![Gala Mym](${DepotPaths.getCharaIconURL('100010_04_r05')}[unitIcon])`;
const galaMymMdTransformed = `${galaMymImageMd}${galaMymAnalysisLink}`;

describe('Quick reference transformer (Quest/Misc/Mixed)', () => {
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
    const text = 'Miscellaneous post #M3 Quest Post #Q1 :Gala Mym: Analysis';

    const result = await transformQuickReference({text, lang});

    const expectedMisc =
      `Miscellaneous post [${translations[lang].posts.misc.titleSelf} #3]` +
      `(${makePostPath(PostPath.MISC, {pid: 3, lang})})`;
    const expectedQuest =
      `Quest Post [${translations[lang].posts.quest.titleSelf} #1]` +
      `(${makePostPath(PostPath.QUEST, {pid: 1, lang})})`;
    const expectedAnalysis =
      `${galaMymMdTransformed} Analysis`;
    expect(result).toBe(`${expectedMisc} ${expectedQuest} ${expectedAnalysis}`);
  });

  it('keeps already transformed references intact', async () => {
    const expectedMisc =
      `Miscellaneous post [${translations[lang].posts.misc.titleSelf} #3]` +
      `(${makePostPath(PostPath.MISC, {pid: 3, lang})})`;
    const expectedQuest =
      `Quest Post [${translations[lang].posts.quest.titleSelf} #1]` +
      `(${makePostPath(PostPath.QUEST, {pid: 1, lang})})`;
    const expectedAnalysis =
      `${galaMymMdTransformed} Analysis`;
    const text = `${expectedMisc} ${expectedQuest} ${expectedAnalysis}`;

    const result = await transformQuickReference({text, lang});

    expect(result).toBe(text);
  });
});

describe('Quick reference transformer (Analysis)', () => {
  beforeEach(() => {
    // Mocking this because the fetching promises in `getUnitNameIdMap()` cannot resolve
    jest.spyOn(unitInfoUtils, 'getUnitNameInfoMap').mockResolvedValue(new Map([
      ['Brunhilda', generateBrunhildaInfo()],
      ['BrunhildaExtended', generateHighBrunhildaInfo()],
      ['Gala Mym', generateGalaMymInfo()],
    ]));
  });

  it('transforms analysis link', async () => {
    const text = ':Gala Mym:';

    const result = await transformQuickReference({text, lang});

    expect(result).toBe(galaMymMdTransformed);
  });

  it('transforms simple unit name', async () => {
    const text = 'Gala Mym';

    const result = await transformQuickReference({text, lang});

    expect(result).toBe(galaMymMdTransformed);
  });

  it('does not transform unit name that is wrapped by spaces', async () => {
    const text = ' Gala Mym ';

    const result = await transformQuickReference({text, lang});

    expect(result).toBe(text);
  });

  it('transforms analysis link (sentenced)', async () => {
    const text = 'Check :Gala Mym: Analysis';

    const result = await transformQuickReference({text, lang});

    const expectedText = `Check ${galaMymMdTransformed} Analysis`;
    expect(result).toBe(expectedText);
  });

  it('keeps transformed analysis intact', async () => {
    const result = await transformQuickReference({text: galaMymMdTransformed, lang});

    expect(result).toBe(galaMymMdTransformed);
  });

  it('does not transform incomplete analysis link', async () => {
    const text = 'Gala Analysis';

    const result = await transformQuickReference({text, lang});

    expect(result).toBe(text);
  });

  it('matches greedily', async () => {
    const brunhildaExtAnalysisLink = `[BrunhildaExtended](${makePostPath(PostPath.ANALYSIS, {pid: 20050102, lang})})`;
    const brunhildaExtImageMd = `![BrunhildaExtended](${DepotPaths.getDragonIconURL('210039_01')}[unitIcon])`;
    const brunhildaExtMdTransformed = `${brunhildaExtImageMd}${brunhildaExtAnalysisLink}`;

    const text = ':BrunhildaExtended:';

    const result = await transformQuickReference({text, lang});

    expect(result).toBe(brunhildaExtMdTransformed);
  });
});

import React from 'react';

import {screen} from '@testing-library/react';

import {generateGalaMymInfo} from '../../../test/data/mock/unitInfo';
import {renderReact} from '../../../test/render/main';
import {SupportedLanguages} from '../../api-def/api';
import {DepotPaths} from '../../api-def/resources';
import {Markdown} from '../../components/elements/markdown/main';
import {PostPath} from '../../const/path/definitions';
import {translations} from '../../i18n/translations/main';
import {makePostPath} from '../path/make';
import * as unitInfoUtils from '../services/resources/unitInfo/utils';
import {processText} from './text';


describe('Process text', () => {
  const lang = SupportedLanguages.EN;

  const galaMymAnalysisLink = `[Gala Mym](${makePostPath(PostPath.ANALYSIS, {pid: 10550101, lang})})`;
  const galaMymImageMd = `![Gala Mym](${DepotPaths.getCharaIconURL('100010_04_r05')}[unitIcon])`;
  const galaMymMdTransformed = `${galaMymImageMd}${galaMymAnalysisLink}`;

  beforeEach(() => {
    // Mocking this because the fetching promises in `getUnitNameIdMap()` do not resolve
    jest.spyOn(unitInfoUtils, 'getUnitNameInfoMap').mockResolvedValue(new Map([
      ['Gala Mym', generateGalaMymInfo()],
    ]));
  });

  it('transforms all quick references at once', async () => {
    const text = 'Miscellaneous post #M3 Quest Post #Q1 :Gala Mym: Analysis';

    const result = await processText({text, lang});

    const expectedMisc =
      `Miscellaneous post [${translations[lang].posts.misc.titleSelf} #3]` +
      `(${makePostPath(PostPath.MISC, {pid: 3, lang})})`;
    const expectedQuest =
      `Quest Post [${translations[lang].posts.quest.titleSelf} #1]` +
      `(${makePostPath(PostPath.QUEST, {pid: 1, lang})})`;
    expect(result).toBe(`${expectedMisc} ${expectedQuest} ${galaMymMdTransformed} Analysis`);
  });

  it('transforms empty string without error', async () => {
    const text = '';

    const result = await processText({text, lang});

    expect(result).toBe('');
  });

  it('keeps already transformed references intact', async () => {
    const expectedMisc =
      `Miscellaneous post [${translations[lang].posts.misc.titleSelf} #3]` +
      `(${makePostPath(PostPath.MISC, {pid: 3, lang})})`;
    const expectedQuest =
      `Quest Post [${translations[lang].posts.quest.titleSelf} #1]` +
      `(${makePostPath(PostPath.QUEST, {pid: 1, lang})})`;
    const text = `${expectedMisc} ${expectedQuest} ${galaMymMdTransformed}`;

    const result = await processText({text, lang});

    expect(result).toBe(text);
  });

  it('renders correctly for unit icon in table cell', async () => {
    const text = 'head | col 2\n:---: | :---:\n:Gala Mym: | Y';

    const result = await processText({text, lang});

    renderReact(() => <Markdown>{result}</Markdown>);

    expect(screen.getByAltText('Gala Mym')).toBeInTheDocument();
  });
});

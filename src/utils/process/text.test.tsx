import React from 'react';

import {screen} from '@testing-library/react';

import {generateGalaMymInfo} from '../../../test/data/mock/unitInfo';
import {renderReact} from '../../../test/render/main';
import {SupportedLanguages, UnitType} from '../../api-def/api';
import {SimpleUnitInfo} from '../../api-def/resources';
import {Markdown} from '../../components/elements/markdown/main';
import {PostPath} from '../../const/path/definitions';
import {translations} from '../../i18n/translations/main';
import {makePostUrl} from '../path/make';
import * as unitInfoUtils from '../services/resources/unitInfo/utils';
import {processText} from './text';


describe('Process text', () => {
  const lang = SupportedLanguages.EN;

  const galaMymMdTransformed = '--10550101/Gala Mym--';

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
      `(${makePostUrl(PostPath.MISC, {pid: 3, lang})})`;
    const expectedQuest =
      `Quest Post [${translations[lang].posts.quest.titleSelf} #1]` +
      `(${makePostUrl(PostPath.QUEST, {pid: 1, lang})})`;
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
      `(${makePostUrl(PostPath.MISC, {pid: 3, lang})})`;
    const expectedQuest =
      `Quest Post [${translations[lang].posts.quest.titleSelf} #1]` +
      `(${makePostUrl(PostPath.QUEST, {pid: 1, lang})})`;
    const text = `${expectedMisc} ${expectedQuest} ${galaMymMdTransformed}`;

    const result = await processText({text, lang});

    expect(result).toBe(text);
  });

  const simpleUnitInfo: SimpleUnitInfo = {
    '10550101': {
      name: {
        [SupportedLanguages.CHT]: 'CHT',
        [SupportedLanguages.EN]: 'Gala Mym',
        [SupportedLanguages.JP]: 'JP',
      },
      type: UnitType.CHARACTER,
      icon: '',
    },
  };

  it('renders correctly for unit icon in table cell', async () => {
    const text = 'head | col 2\n:---: | :---:\n:Gala Mym: | Y';

    const result = await processText({text, lang});

    renderReact(
      () => <Markdown>{result}</Markdown>,
      {resources: {simpleUnitInfo}},
    );

    expect(screen.getByText('Gala Mym')).toBeInTheDocument();
  });
});

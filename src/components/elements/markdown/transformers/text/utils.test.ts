import {expect} from '@jest/globals';

import {SupportedLanguages} from '../../../../../api-def/api';
import {StatusEnums} from '../../../../../api-def/resources';
import {makeAfflictionIconMarkdown} from './icon/utils';
import {injectMarkdownToText} from './utils';


describe('Text injection', () => {
  const afflictions: StatusEnums['status'] = [
    {
      name: 'POISON',
      code: 1,
      imagePath: 'poison.png',
      trans: {
        [SupportedLanguages.CHT]: 'Poison CHT',
        [SupportedLanguages.EN]: 'Poison',
        [SupportedLanguages.JP]: 'Poison JP',
      },
    },
    {
      name: 'FLASHBURN',
      code: 1,
      imagePath: 'flashburn.png',
      trans: {
        [SupportedLanguages.CHT]: '閃熱',
        [SupportedLanguages.EN]: 'Flashburn',
        [SupportedLanguages.JP]: '閃熱',
      },
    },
  ];

  it('does not inject anything', async () => {
    const injected = injectMarkdownToText(SupportedLanguages.EN, 'Text', {afflictions});

    expect(injected).toBe('Text');
  });

  it('injects affliction icon before affliction text', async () => {
    const injected = injectMarkdownToText(SupportedLanguages.EN, 'Poison', {afflictions});

    expect(injected).toBe(`${makeAfflictionIconMarkdown(afflictions[0])}Poison`);
  });

  it('injects affliction icon in a sentence', async () => {
    const injected = injectMarkdownToText(SupportedLanguages.EN, 'Afflicts Poison', {afflictions});

    expect(injected).toBe(`Afflicts ${makeAfflictionIconMarkdown(afflictions[0])}Poison`);
  });

  it('injects affliction icon in a continuous word', async () => {
    const injected = injectMarkdownToText(SupportedLanguages.CHT, '上閃熱', {afflictions});

    expect(injected).toBe(`上${makeAfflictionIconMarkdown(afflictions[1])}閃熱`);
  });

  it('injects affliction icon case-insensitively', async () => {
    const injected = injectMarkdownToText(SupportedLanguages.EN, 'Afflicts poison', {afflictions});

    expect(injected).toBe(`Afflicts ${makeAfflictionIconMarkdown(afflictions[0])}Poison`);
  });

  it('does not inject affliction icon if already exists', async () => {
    const injected = injectMarkdownToText(
      SupportedLanguages.EN,
      `${makeAfflictionIconMarkdown(afflictions[0])}Poison`,
      {afflictions},
    );

    expect(injected).toBe(`${makeAfflictionIconMarkdown(afflictions[0])}Poison`);
  });

  it('does not inject affliction icon if already exists (precedes with space)', async () => {
    const injected = injectMarkdownToText(
      SupportedLanguages.EN,
      `${makeAfflictionIconMarkdown(afflictions[0])} Poison`,
      {afflictions},
    );

    expect(injected).toBe(`${makeAfflictionIconMarkdown(afflictions[0])} Poison`);
  });
});

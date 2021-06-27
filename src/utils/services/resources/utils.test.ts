import {SupportedLanguages} from '../../../api-def/api/other/lang';
import {EnumEntry} from '../../../api-def/resources';
import {reverseEnumTransLookup} from './utils';


describe('Resource utils', () => {
  const enums: Array<EnumEntry> = [
    {
      name: '#1',
      code: 1,
      imagePath: '/1.jpg',
      trans: {
        [SupportedLanguages.CHT]: 'CHT 1',
        [SupportedLanguages.EN]: 'EN 1',
        [SupportedLanguages.JP]: 'JP 1',
      },
    },
    {
      name: '#2',
      code: 2,
      imagePath: '/2.jpg',
      trans: {
        [SupportedLanguages.CHT]: 'CHT 2',
        [SupportedLanguages.EN]: 'EN 2',
        [SupportedLanguages.JP]: 'JP 2',
      },
    },
  ];

  it('returns correct translation of the found enum entry', async () => {
    const foundEnum = reverseEnumTransLookup(enums, 1, SupportedLanguages.EN, 'not found');

    expect(foundEnum).toBe('EN 1');
  });

  it('returns the fallback name of the enum if not found', async () => {
    const foundEnum = reverseEnumTransLookup(enums, 3, SupportedLanguages.EN, 'not found');

    expect(foundEnum).toBe('not found');
  });
});

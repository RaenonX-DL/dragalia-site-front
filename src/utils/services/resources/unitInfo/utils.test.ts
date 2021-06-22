import {SupportedLanguages} from '../../../../api-def/api';
import {Element, Weapon} from '../../../../api-def/resources';
import {ResourceLoader} from '../loader';
import {getUnitNameIdMap} from './utils';


describe('Unit info utils', () => {
  let fnGetCharaInfo: jest.SpyInstance;
  let fnGetDragonInfo: jest.SpyInstance;

  beforeEach(() => {
    fnGetCharaInfo = jest.spyOn(ResourceLoader, 'getCharacterInfo').mockResolvedValue([{
      id: 10950101,
      element: Element.FLAME,
      cvEn: {
        [SupportedLanguages.CHT]: 'CV EN CHT',
        [SupportedLanguages.EN]: 'CV EN EN',
        [SupportedLanguages.JP]: 'CV EN JP',
      },
      cvJp: {
        [SupportedLanguages.CHT]: 'CV JP CHT',
        [SupportedLanguages.EN]: 'CV JP EN',
        [SupportedLanguages.JP]: 'CV JP JP',
      },
      hasUniqueDragon: false,
      iconName: 'icon',
      name: {
        [SupportedLanguages.CHT]: 'CHARA CHT',
        [SupportedLanguages.EN]: 'CHARA EN',
        [SupportedLanguages.JP]: 'CHARA JP',
      },
      rarity: 5,
      releaseEpoch: 0,
      weapon: Weapon.SWORD,
    }]);
    fnGetDragonInfo = jest.spyOn(ResourceLoader, 'getDragonInfo').mockResolvedValue([{
      id: 20950101,
      element: Element.FLAME,
      cvEn: {
        [SupportedLanguages.CHT]: 'CV EN CHT',
        [SupportedLanguages.EN]: 'CV EN EN',
        [SupportedLanguages.JP]: 'CV EN JP',
      },
      cvJp: {
        [SupportedLanguages.CHT]: 'CV JP CHT',
        [SupportedLanguages.EN]: 'CV JP EN',
        [SupportedLanguages.JP]: 'CV JP JP',
      },
      iconName: 'icon',
      name: {
        [SupportedLanguages.CHT]: 'DRAGON CHT',
        [SupportedLanguages.EN]: 'DRAGON EN',
        [SupportedLanguages.JP]: 'DRAGON JP',
      },
      rarity: 5,
      releaseEpoch: 0,
    }]);
  });

  it('returns unit ID name map', async () => {
    const nameIdMap = await getUnitNameIdMap(SupportedLanguages.EN);

    expect(nameIdMap.size).toBe(2);
    expect(nameIdMap.get('CHARA EN')).toBe(10950101);
    expect(nameIdMap.get('CHARA JP')).toBeUndefined();
    expect(nameIdMap.get('DRAGON EN')).toBe(20950101);
  });

  it('uses the cached map', async () => {
    await getUnitNameIdMap(SupportedLanguages.EN);
    await getUnitNameIdMap(SupportedLanguages.EN);

    expect(fnGetCharaInfo).not.toHaveBeenCalledTimes(2);
    expect(fnGetDragonInfo).not.toHaveBeenCalledTimes(2);
  });
});

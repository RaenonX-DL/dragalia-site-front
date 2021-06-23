import {SupportedLanguages, UnitType} from '../../../../api-def/api';
import {CharaInfoData, DragonInfoData, Element, Weapon} from '../../../../api-def/resources';
import {ResourceLoader} from '../loader';
import {getUnitNameInfoMap} from './utils';


describe('Unit info utils', () => {
  let fnGetCharaInfo: jest.SpyInstance;
  let fnGetDragonInfo: jest.SpyInstance;

  const charaInfo: CharaInfoData = {
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
  };

  const dragonInfo: DragonInfoData = {
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
  };

  beforeEach(() => {
    fnGetCharaInfo = jest.spyOn(ResourceLoader, 'getCharacterInfo').mockResolvedValue([charaInfo]);
    fnGetDragonInfo = jest.spyOn(ResourceLoader, 'getDragonInfo').mockResolvedValue([dragonInfo]);
  });

  it('returns unit info name map', async () => {
    const nameIdMap = await getUnitNameInfoMap(SupportedLanguages.EN);

    expect(nameIdMap.size).toBe(2);
    expect(nameIdMap.get('CHARA EN')).toStrictEqual({...charaInfo, type: UnitType.CHARACTER});
    expect(nameIdMap.get('CHARA JP')).toBeUndefined();
    expect(nameIdMap.get('DRAGON EN')).toStrictEqual({...dragonInfo, type: UnitType.DRAGON});
  });

  it('uses the cached map', async () => {
    await getUnitNameInfoMap(SupportedLanguages.EN);
    await getUnitNameInfoMap(SupportedLanguages.EN);

    expect(fnGetCharaInfo).not.toHaveBeenCalledTimes(2);
    expect(fnGetDragonInfo).not.toHaveBeenCalledTimes(2);
  });

  it('does not overwrite the cached map in different language', async () => {
    await getUnitNameInfoMap(SupportedLanguages.EN);
    await getUnitNameInfoMap(SupportedLanguages.EN);
    fnGetCharaInfo.mockClear();

    await getUnitNameInfoMap(SupportedLanguages.CHT);

    expect(fnGetCharaInfo).toHaveBeenCalled();
    expect(fnGetDragonInfo).toHaveBeenCalled();

    fnGetCharaInfo.mockClear();
    fnGetDragonInfo.mockClear();
    await getUnitNameInfoMap(SupportedLanguages.EN);
    expect(fnGetCharaInfo).not.toHaveBeenCalled();
    expect(fnGetDragonInfo).not.toHaveBeenCalled();
  });
});

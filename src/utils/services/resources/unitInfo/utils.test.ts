import {
  ApiResponseCode,
  PartiallySupportedLanguages,
  SupportedLanguages,
  UnitNameRefResponse,
  UnitType,
} from '../../../../api-def/api';
import {CharaInfoData, DepotPaths, DragonInfoData, Element, UnitInfoData, Weapon} from '../../../../api-def/resources';
import {ApiRequestSender} from '../../api/requestSender';
import {ResourceLoader} from '../loader';
import {getImageURL, getUnitNameInfoMap} from './utils';


describe('Unit Info Name Map', () => {
  let fnGetCharaInfo: jest.SpyInstance;
  let fnGetDragonInfo: jest.SpyInstance;
  let fnGetUnitNameRef: jest.SpyInstance;

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
      [PartiallySupportedLanguages.CHS]: 'CHARA CHS',
      [SupportedLanguages.CHT]: 'CHARA CHT',
      [SupportedLanguages.EN]: 'CHARA EN',
      [SupportedLanguages.JP]: 'CHARA JP',
    },
    rarity: 5,
    releaseEpoch: 0,
    weapon: Weapon.SWORD,
    type: UnitType.CHARACTER,
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
      [PartiallySupportedLanguages.CHS]: 'DRAGON CHS',
      [SupportedLanguages.CHT]: 'DRAGON CHT',
      [SupportedLanguages.EN]: 'DRAGON EN',
      [SupportedLanguages.JP]: 'DRAGON JP',
    },
    rarity: 5,
    releaseEpoch: 0,
    type: UnitType.DRAGON,
  };

  const unitNameRefResponse: UnitNameRefResponse = {
    code: ApiResponseCode.SUCCESS,
    success: true,
    data: {
      'G!Leonidas': 10950101,
      'Non-existent': 30707007,
    },
  };

  beforeEach(() => {
    fnGetCharaInfo = jest.spyOn(ResourceLoader, 'getCharacterInfo').mockResolvedValue([charaInfo]);
    fnGetDragonInfo = jest.spyOn(ResourceLoader, 'getDragonInfo').mockResolvedValue([dragonInfo]);
    fnGetUnitNameRef = jest.spyOn(ApiRequestSender, 'getUnitNameReferences').mockResolvedValue(unitNameRefResponse);
  });

  it('returns unit info name map', async () => {
    const nameIdMap = await getUnitNameInfoMap(SupportedLanguages.EN);

    expect(nameIdMap.size).toBe(3);
    expect(nameIdMap.get('CHARA EN')).toStrictEqual({...charaInfo, type: UnitType.CHARACTER});
    expect(nameIdMap.get('CHARA JP')).toBeUndefined();
    expect(nameIdMap.get('DRAGON EN')).toStrictEqual({...dragonInfo, type: UnitType.DRAGON});
  });

  it('uses the cached map', async () => {
    await getUnitNameInfoMap(SupportedLanguages.EN);
    await getUnitNameInfoMap(SupportedLanguages.EN);

    expect(fnGetCharaInfo).not.toHaveBeenCalledTimes(2);
    expect(fnGetDragonInfo).not.toHaveBeenCalledTimes(2);
    expect(fnGetUnitNameRef).not.toHaveBeenCalledTimes(2);
  });

  it('does not overwrite the cached map in different language', async () => {
    await getUnitNameInfoMap(SupportedLanguages.EN);
    await getUnitNameInfoMap(SupportedLanguages.EN);
    fnGetCharaInfo.mockClear();

    await getUnitNameInfoMap(SupportedLanguages.CHT);

    expect(fnGetCharaInfo).toHaveBeenCalled();
    expect(fnGetDragonInfo).toHaveBeenCalled();
    expect(fnGetUnitNameRef).toHaveBeenCalled();

    fnGetCharaInfo.mockClear();
    fnGetDragonInfo.mockClear();
    fnGetUnitNameRef.mockClear();
    await getUnitNameInfoMap(SupportedLanguages.EN);
    expect(fnGetCharaInfo).not.toHaveBeenCalled();
    expect(fnGetDragonInfo).not.toHaveBeenCalled();
    expect(fnGetUnitNameRef).not.toHaveBeenCalled();
  });

  it('merges with unit name references', async () => {
    const nameIdMap = await getUnitNameInfoMap(SupportedLanguages.EN);

    expect(nameIdMap.size).toBe(3);
    expect(nameIdMap.get('CHARA EN')).toStrictEqual({...charaInfo, type: UnitType.CHARACTER});
    expect(nameIdMap.get('G!Leonidas')).toStrictEqual({...charaInfo, type: UnitType.CHARACTER});
    expect(nameIdMap.get('Non-existent')).toBeUndefined();
    expect(nameIdMap.get('CHARA JP')).toBeUndefined();
    expect(nameIdMap.get('DRAGON EN')).toStrictEqual({...dragonInfo, type: UnitType.DRAGON});
  });
});

describe('Get image URL using unit info', () => {
  const name = {
    [PartiallySupportedLanguages.CHS]: 'name CHS',
    [SupportedLanguages.CHT]: 'name CHT',
    [SupportedLanguages.EN]: 'name EN',
    [SupportedLanguages.JP]: 'name JP',
  };

  const unitInfo: UnitInfoData = {
    type: UnitType.CHARACTER,
    name,
    iconName: 'icon',
    id: 11100000,
    element: 1,
    rarity: 5,
    cvEn: name,
    cvJp: name,
    releaseEpoch: 0,
  };

  it('gets character image URL', () => {
    expect(getImageURL(unitInfo)).toBe(DepotPaths.getCharaIconURL('icon'));
  });

  it('gets dragon image URL', () => {
    expect(getImageURL({...unitInfo, type: UnitType.DRAGON, iconName: 'iconDragon'}))
      .toBe(DepotPaths.getDragonIconURL('iconDragon'));
  });
});

import {SupportedLanguages, UnitType} from '../../../../../api-def/api';
import {DepotPaths, CharaInfo, DragonInfo} from '../../../../../api-def/resources';
import {ResourceLoader} from '../../../../../utils/services/resources';
import {InputData} from './in/types';
import {UnitInfo} from './types';
import {getImageURL, getUnitInfo} from './utils';

describe('Get unit info from input data', () => {
  let charaInfo: CharaInfo = [];
  let dragonInfo: DragonInfo = [];

  beforeAll(async () => {
    charaInfo = await ResourceLoader.getCharacterInfo();
    dragonInfo = await ResourceLoader.getDragonInfo();
  });

  it('returns all IDs if input data is empty', async () => {
    const inputData: InputData = {
      keyword: '',
      types: [],
      elements: [],
      weaponTypes: [],
    };

    const unitIds = getUnitInfo(inputData, charaInfo, dragonInfo).map((unit) => unit.id);

    expect(unitIds).toStrictEqual(
      charaInfo
        .map((chara) => chara.id)
        .concat(dragonInfo.map((dragon) => dragon.id)),
    );
  });

  it('filters correctly on single element', async () => {
    const inputData: InputData = {
      keyword: '',
      types: [],
      elements: [1],
      weaponTypes: [],
    };

    const unitIds = getUnitInfo(inputData, charaInfo, dragonInfo).map((unit) => unit.id);

    expect(unitIds).toStrictEqual(
      charaInfo
        .filter((chara) => chara.element === 1)
        .map((chara) => chara.id)
        .concat(
          dragonInfo
            .filter((dragon) => dragon.element === 1)
            .map((dragon) => dragon.id),
        ),
    );
  });

  it('filters correctly on multiple elements', async () => {
    const inputData: InputData = {
      keyword: '',
      types: [],
      elements: [1, 3],
      weaponTypes: [],
    };

    const unitIds = getUnitInfo(inputData, charaInfo, dragonInfo).map((unit) => unit.id);

    expect(unitIds).toStrictEqual(
      charaInfo
        .filter((chara) => [1, 3].includes(chara.element))
        .map((chara) => chara.id)
        .concat(
          dragonInfo
            .filter((dragon) => [1, 3].includes(dragon.element))
            .map((dragon) => dragon.id),
        ),
    );
  });

  it('filters correctly on single analysis type', async () => {
    const inputData: InputData = {
      keyword: '',
      types: [UnitType.DRAGON],
      elements: [],
      weaponTypes: [],
    };

    const unitIds = getUnitInfo(inputData, charaInfo, dragonInfo).map((unit) => unit.id);

    expect(unitIds).toStrictEqual(dragonInfo.map((dragon) => dragon.id));
  });

  it('filters correctly on multiple analysis types', async () => {
    const inputData: InputData = {
      keyword: '',
      types: [UnitType.CHARACTER, UnitType.DRAGON],
      elements: [],
      weaponTypes: [],
    };

    const unitIds = getUnitInfo(inputData, charaInfo, dragonInfo).map((unit) => unit.id);

    expect(unitIds).toStrictEqual(
      charaInfo
        .map((chara) => chara.id)
        .concat(dragonInfo.map((dragon) => dragon.id)),
    );
  });

  it('filters correctly on single weapon type', async () => {
    const inputData: InputData = {
      keyword: '',
      types: [],
      elements: [],
      weaponTypes: [1],
    };

    const unitIds = getUnitInfo(inputData, charaInfo, dragonInfo).map((unit) => unit.id);

    expect(unitIds).toStrictEqual(
      charaInfo
        .filter((chara) => chara.weapon === 1)
        .map((chara) => chara.id),
    );
  });

  it('filters correctly on multiple weapon types', async () => {
    const inputData: InputData = {
      keyword: '',
      types: [],
      elements: [],
      weaponTypes: [1, 3],
    };

    const unitIds = getUnitInfo(inputData, charaInfo, dragonInfo).map((unit) => unit.id);

    expect(unitIds).toStrictEqual(
      charaInfo
        .filter((chara) => [1, 3].includes(chara.weapon))
        .map((chara) => chara.id),
    );
  });

  it('filters correctly on unit name partially matched', async () => {
    const inputData: InputData = {
      keyword: 'T',
      types: [],
      elements: [],
      weaponTypes: [],
    };

    const unitIds = getUnitInfo(inputData, charaInfo, dragonInfo).map((unit) => unit.id);

    expect(unitIds).toStrictEqual(
      charaInfo
        .filter((chara) => Object.values(chara.name).some((name) => name.match(/[Tt]/)))
        .map((chara) => chara.id)
        .concat(dragonInfo
          .filter((dragon) => Object.values(dragon.name).some((name) => name.match(/[Tt]/)))
          .map((dragon) => dragon.id)),
    );
  });

  it('filters correctly on unit name fully matched', async () => {
    const inputData: InputData = {
      keyword: 'Tiki',
      types: [],
      elements: [],
      weaponTypes: [],
    };

    const unitIds = getUnitInfo(inputData, charaInfo, dragonInfo).map((unit) => unit.id);

    expect(unitIds).toStrictEqual(
      charaInfo
        .filter((chara) => Object.values(chara.name).some((name) => name.match(/Tiki/)))
        .map((chara) => chara.id),
    );
  });

  it('filters correctly on flame, sword characters', async () => {
    const inputData: InputData = {
      keyword: '',
      types: [UnitType.CHARACTER],
      elements: [1],
      weaponTypes: [1],
    };

    const unitIds = getUnitInfo(inputData, charaInfo, dragonInfo).map((unit) => unit.id);

    expect(unitIds).toStrictEqual(
      charaInfo
        .filter((chara) => chara.element === 1 && chara.weapon === 1)
        .map((chara) => chara.id),
    );
  });

  it('filters correctly on flame/shadow sword/dagger characters', async () => {
    const inputData: InputData = {
      keyword: '',
      types: [UnitType.CHARACTER],
      elements: [1, 5],
      weaponTypes: [1, 3],
    };

    const unitIds = getUnitInfo(inputData, charaInfo, dragonInfo).map((unit) => unit.id);

    expect(unitIds).toStrictEqual(
      charaInfo
        .filter((chara) => [1, 5].includes(chara.element) && [1, 3].includes(chara.weapon))
        .map((chara) => chara.id),
    );
  });

  it('filters correctly on flame dragons', async () => {
    const inputData: InputData = {
      keyword: '',
      types: [UnitType.DRAGON],
      elements: [1],
      weaponTypes: [],
    };

    const unitIds = getUnitInfo(inputData, charaInfo, dragonInfo).map((unit) => unit.id);

    expect(unitIds).toStrictEqual(
      dragonInfo
        .filter((dragon) => dragon.element === 1)
        .map((dragon) => dragon.id),
    );
  });

  it('filters correctly on flame and shadow dragons', async () => {
    const inputData: InputData = {
      keyword: '',
      types: [UnitType.DRAGON],
      elements: [1, 5],
      weaponTypes: [],
    };

    const unitIds = getUnitInfo(inputData, charaInfo, dragonInfo).map((unit) => unit.id);

    expect(unitIds).toStrictEqual(
      dragonInfo
        .filter((dragon) => [1, 5].includes(dragon.element))
        .map((dragon) => dragon.id),
    );
  });

  it('disregards weapon type and works correctly if type is dragon', async () => {
    const inputData: InputData = {
      keyword: '',
      types: [UnitType.DRAGON],
      elements: [1, 5],
      weaponTypes: [1, 3],
    };

    const unitIds = getUnitInfo(inputData, charaInfo, dragonInfo).map((unit) => unit.id);

    expect(unitIds).toStrictEqual(
      dragonInfo
        .filter((dragon) => [1, 5].includes(dragon.element))
        .map((dragon) => dragon.id),
    );
  });
});

describe('Get image URL by type', () => {
  const name = {
    [SupportedLanguages.CHT]: 'name CHT',
    [SupportedLanguages.EN]: 'name EN',
    [SupportedLanguages.JP]: 'name JP',
  };

  const unitInfo: UnitInfo = {
    unitType: UnitType.CHARACTER,
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
    expect(getImageURL({...unitInfo, unitType: UnitType.DRAGON, iconName: 'iconDragon'}))
      .toBe(DepotPaths.getDragonIconURL('iconDragon'));
  });
});

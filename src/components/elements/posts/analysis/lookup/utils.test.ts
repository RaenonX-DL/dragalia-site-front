import {SupportedLanguages, UnitType} from '../../../../../api-def/api';
import {DepotPaths, CharaInfo, DragonInfo, UnitInfoData} from '../../../../../api-def/resources';
import {InputData} from './in/types';
import {getImageURL, getUnitInfo} from './utils';
import {charaData, dragonData} from './utils.test.data';

describe('Get unit info from input data', () => {
  const charaInfo: CharaInfo = charaData;
  const dragonInfo: DragonInfo = dragonData;

  it('returns all IDs if input data is empty', async () => {
    const inputData: InputData = {
      keyword: '',
      types: [],
      elements: [],
      weaponTypes: [],
    };

    const unitIds = getUnitInfo(inputData, charaInfo, dragonInfo)
      .map((unit) => unit.id)
      .sort((a, b) => a - b);

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

    const unitIds = getUnitInfo(inputData, charaInfo, dragonInfo)
      .map((unit) => unit.id)
      .sort((a, b) => a - b);

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

    const unitIds = getUnitInfo(inputData, charaInfo, dragonInfo)
      .map((unit) => unit.id)
      .sort((a, b) => a - b);

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

    const unitIds = getUnitInfo(inputData, charaInfo, dragonInfo)
      .map((unit) => unit.id)
      .sort((a, b) => a - b);

    expect(unitIds).toStrictEqual(dragonInfo.map((dragon) => dragon.id));
  });

  it('filters correctly on multiple analysis types', async () => {
    const inputData: InputData = {
      keyword: '',
      types: [UnitType.CHARACTER, UnitType.DRAGON],
      elements: [],
      weaponTypes: [],
    };

    const unitIds = getUnitInfo(inputData, charaInfo, dragonInfo)
      .map((unit) => unit.id)
      .sort((a, b) => a - b);

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

    const unitIds = getUnitInfo(inputData, charaInfo, dragonInfo)
      .map((unit) => unit.id)
      .sort((a, b) => a - b);

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

    const unitIds = getUnitInfo(inputData, charaInfo, dragonInfo)
      .map((unit) => unit.id)
      .sort((a, b) => a - b);

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

    const unitIds = getUnitInfo(inputData, charaInfo, dragonInfo)
      .map((unit) => unit.id)
      .sort((a, b) => a - b);

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

    const unitIds = getUnitInfo(inputData, charaInfo, dragonInfo)
      .map((unit) => unit.id)
      .sort((a, b) => a - b);

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

    const unitIds = getUnitInfo(inputData, charaInfo, dragonInfo)
      .map((unit) => unit.id)
      .sort((a, b) => a - b);

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

    const unitIds = getUnitInfo(inputData, charaInfo, dragonInfo)
      .map((unit) => unit.id)
      .sort((a, b) => a - b);

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

    const unitIds = getUnitInfo(inputData, charaInfo, dragonInfo)
      .map((unit) => unit.id)
      .sort((a, b) => a - b);

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

    const unitIds = getUnitInfo(inputData, charaInfo, dragonInfo)
      .map((unit) => unit.id)
      .sort((a, b) => a - b);

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

    const unitIds = getUnitInfo(inputData, charaInfo, dragonInfo)
      .map((unit) => unit.id)
      .sort((a, b) => a - b);

    expect(unitIds).toStrictEqual(
      dragonInfo
        .filter((dragon) => [1, 5].includes(dragon.element))
        .map((dragon) => dragon.id),
    );
  });

  it('sorts by type, rarity 5-3, element, then weapon', async () => {
    const inputData: InputData = {
      keyword: '',
      types: [],
      elements: [],
      weaponTypes: [],
    };

    const unitIds = getUnitInfo(inputData, charaInfo, dragonInfo).map((unit) => unit.id);

    const expectedOrder = [
      // Chara
      10450103, 10550103, 10550104, 10750104, // R5 Flame
      10350204, 10450204, 10650203, 10850202, // R5 Water
      10150304, 10250303, 10550304, 10850302, // R5 Wind
      10150404, 10550405, 10650402, 10850402, // R5 Light
      10150503, 10350504, 10350505, 10750505, // R5 Shadow
      10340203, // R4 Water Chara
      // Dragon
      20050116, 20050315, 20050414, // R5
    ];

    expect(unitIds.filter((unitId) => expectedOrder.includes(unitId))).toStrictEqual(expectedOrder);
  });

  it('returns an empty array if nothing match', async () => {
    const inputData: InputData = {
      keyword: 'AAAA',
      types: [],
      elements: [],
      weaponTypes: [],
    };

    const unitIds = getUnitInfo(inputData, charaInfo, dragonInfo)
      .map((unit) => unit.id);

    expect(unitIds).toStrictEqual([]);
  });
});

describe('Get image URL by type', () => {
  const name = {
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

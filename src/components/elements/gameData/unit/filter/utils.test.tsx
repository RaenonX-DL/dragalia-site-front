import charaData from '../../../../../../test/data/resources/info/chara.json';
import dragonData from '../../../../../../test/data/resources/info/dragon.json';
import {UnitType} from '../../../../../api-def/api';
import {CharaInfo, DragonInfo} from '../../../../../api-def/resources';
import {overrideObject} from '../../../../../utils/override';
import {UnitFilterInputData} from './types';
import {generateFilterInput, getFilteredUnitInfo} from './utils';


describe('Get filtered unit info', () => {
  const charaInfo: CharaInfo = charaData;
  const dragonInfo: DragonInfo = dragonData;

  it('filters correctly on single element', async () => {
    const inputData: UnitFilterInputData<'unitId'> = overrideObject(generateFilterInput('unitId'), {elements: [1]});

    const unitIds = getFilteredUnitInfo(inputData, charaInfo, dragonInfo, {})
      .map((unit) => unit.id)
      .sort((a, b) => a - b);

    expect(unitIds).toStrictEqual(
      charaInfo.filter((chara) => chara.element === 1).map((chara) => chara.id),
    );
  });

  it('filters correctly on multiple elements', async () => {
    const inputData: UnitFilterInputData<'unitId'> = overrideObject(generateFilterInput('unitId'), {elements: [1, 3]});

    const unitIds = getFilteredUnitInfo(inputData, charaInfo, dragonInfo, {})
      .map((unit) => unit.id)
      .sort((a, b) => a - b);

    expect(unitIds).toStrictEqual(
      charaInfo
        .filter((chara) => [1, 3].includes(chara.element))
        .map((chara) => chara.id),
    );
  });

  it('filters correctly on single analysis type', async () => {
    const inputData: UnitFilterInputData<'unitId'> = overrideObject(
      generateFilterInput('unitId'),
      {type: UnitType.DRAGON},
    );

    const unitIds = getFilteredUnitInfo(inputData, charaInfo, dragonInfo, {})
      .map((unit) => unit.id)
      .sort((a, b) => a - b);

    expect(unitIds).toStrictEqual(dragonInfo.map((dragon) => dragon.id));
  });

  it('filters correctly on single weapon type', async () => {
    const inputData: UnitFilterInputData<'unitId'> = overrideObject(
      generateFilterInput('unitId'),
      {weaponTypes: [1]},
    );

    const unitIds = getFilteredUnitInfo(inputData, charaInfo, dragonInfo, {})
      .map((unit) => unit.id)
      .sort((a, b) => a - b);

    expect(unitIds).toStrictEqual(
      charaInfo
        .filter((chara) => chara.weapon === 1)
        .map((chara) => chara.id),
    );
  });

  it('filters correctly on multiple weapon types', async () => {
    const inputData: UnitFilterInputData<'unitId'> = overrideObject(
      generateFilterInput('unitId'),
      {weaponTypes: [1, 3]},
    );

    const unitIds = getFilteredUnitInfo(inputData, charaInfo, dragonInfo, {})
      .map((unit) => unit.id)
      .sort((a, b) => a - b);

    expect(unitIds).toStrictEqual(
      charaInfo
        .filter((chara) => [1, 3].includes(chara.weapon))
        .map((chara) => chara.id),
    );
  });

  it('filters correctly on unit name partially matched', async () => {
    const inputData: UnitFilterInputData<'unitId'> = overrideObject(generateFilterInput('unitId'), {keyword: 'T'});

    const unitIds = getFilteredUnitInfo(inputData, charaInfo, dragonInfo, {})
      .map((unit) => unit.id)
      .sort((a, b) => a - b);

    expect(unitIds).toStrictEqual(
      charaInfo
        .filter((chara) => Object.values(chara.name).some((name) => name.match(/[Tt]/)))
        .map((chara) => chara.id),
    );
  });

  it('filters correctly on unit name fully matched', async () => {
    const inputData: UnitFilterInputData<'unitId'> = overrideObject(generateFilterInput('unitId'), {keyword: 'Tiki'});

    const unitIds = getFilteredUnitInfo(inputData, charaInfo, dragonInfo, {})
      .map((unit) => unit.id)
      .sort((a, b) => a - b);

    expect(unitIds).toStrictEqual(
      charaInfo
        .filter((chara) => Object.values(chara.name).some((name) => name.match(/Tiki/)))
        .map((chara) => chara.id),
    );
  });

  it('filters correctly on flame, sword characters', async () => {
    const inputData: UnitFilterInputData<'unitId'> = overrideObject(
      generateFilterInput('unitId'),
      {
        type: UnitType.CHARACTER,
        elements: [1],
        weaponTypes: [1],
      },
    );

    const unitIds = getFilteredUnitInfo(inputData, charaInfo, dragonInfo, {})
      .map((unit) => unit.id)
      .sort((a, b) => a - b);

    expect(unitIds).toStrictEqual(
      charaInfo
        .filter((chara) => chara.element === 1 && chara.weapon === 1)
        .map((chara) => chara.id),
    );
  });

  it('filters correctly on flame/shadow sword/dagger characters', async () => {
    const inputData: UnitFilterInputData<'unitId'> = overrideObject(
      generateFilterInput('unitId'),
      {
        type: UnitType.CHARACTER,
        elements: [1, 5],
        weaponTypes: [1, 3],
      },
    );

    const unitIds = getFilteredUnitInfo(inputData, charaInfo, dragonInfo, {})
      .map((unit) => unit.id)
      .sort((a, b) => a - b);

    expect(unitIds).toStrictEqual(
      charaInfo
        .filter((chara) => [1, 5].includes(chara.element) && [1, 3].includes(chara.weapon))
        .map((chara) => chara.id),
    );
  });

  it('filters correctly on flame dragons', async () => {
    const inputData: UnitFilterInputData<'unitId'> = overrideObject(
      generateFilterInput('unitId'),
      {
        type: UnitType.DRAGON,
        elements: [1],
        weaponTypes: [1, 3],
      },
    );

    const unitIds = getFilteredUnitInfo(inputData, charaInfo, dragonInfo, {})
      .map((unit) => unit.id)
      .sort((a, b) => a - b);

    expect(unitIds).toStrictEqual(
      dragonInfo
        .filter((dragon) => dragon.element === 1)
        .map((dragon) => dragon.id),
    );
  });

  it('filters correctly on flame and shadow dragons', async () => {
    const inputData: UnitFilterInputData<'unitId'> = overrideObject(
      generateFilterInput('unitId'),
      {
        type: UnitType.DRAGON,
        elements: [1, 5],
      },
    );

    const unitIds = getFilteredUnitInfo(inputData, charaInfo, dragonInfo, {})
      .map((unit) => unit.id)
      .sort((a, b) => a - b);

    expect(unitIds).toStrictEqual(
      dragonInfo
        .filter((dragon) => [1, 5].includes(dragon.element))
        .map((dragon) => dragon.id),
    );
  });

  it('disregards weapon type and works correctly if type is dragon', async () => {
    const inputData: UnitFilterInputData<'unitId'> = overrideObject(
      generateFilterInput('unitId'),
      {
        type: UnitType.DRAGON,
        elements: [1, 5],
        weaponTypes: [1, 3],
      },
    );

    const unitIds = getFilteredUnitInfo(inputData, charaInfo, dragonInfo, {})
      .map((unit) => unit.id)
      .sort((a, b) => a - b);

    expect(unitIds).toStrictEqual(
      dragonInfo
        .filter((dragon) => [1, 5].includes(dragon.element))
        .map((dragon) => dragon.id),
    );
  });

  it('sorts by type, rarity 5-3, element, then weapon', async () => {
    const inputData: UnitFilterInputData<'unitId'> = generateFilterInput('unitId');

    const unitIds = getFilteredUnitInfo(inputData, charaInfo, dragonInfo, {}).map((unit) => unit.id);

    const expectedOrder = [
      // Chara
      10450103, 10550103, 10550104, 10750104, // R5 Flame
      10350204, 10450204, 10650203, 10850202, // R5 Water
      10150304, 10250303, 10550304, 10850302, // R5 Wind
      10150404, 10550405, 10650402, 10850402, // R5 Light
      10150503, 10350504, 10350505, 10750505, // R5 Shadow
      10340203, // R4 Water Chara
    ];

    expect(unitIds.filter((unitId) => expectedOrder.includes(unitId))).toStrictEqual(expectedOrder);
  });

  it('returns an empty array if nothing match', async () => {
    const inputData: UnitFilterInputData<'unitId'> = overrideObject(
      generateFilterInput('unitId'),
      {keyword: 'AAAA'},
    );

    const unitIds = getFilteredUnitInfo(inputData, charaInfo, dragonInfo, {})
      .map((unit) => unit.id);

    expect(unitIds).toStrictEqual([]);
  });

  it('filters by custom name', async () => {
    const inputData: UnitFilterInputData<'unitId'> = overrideObject(
      generateFilterInput('unitId'),
      {keyword: 'AAAA'},
    );

    const unitIds = getFilteredUnitInfo(inputData, charaInfo, dragonInfo, {'AAAAA': 10750404})
      .map((unit) => unit.id);

    expect(unitIds).toStrictEqual([10750404]);
  });

  it('filters using CHS name', async () => {
    const inputData: UnitFilterInputData<'unitId'> = overrideObject(
      generateFilterInput('unitId'),
      {keyword: '谢斯'},
    );

    const unitIds = getFilteredUnitInfo(inputData, charaInfo, dragonInfo, {})
      .map((unit) => unit.id);

    expect(unitIds).toStrictEqual([10750404, 10650503, 10950501]);
  });

  it('filters using CHS alias', async () => {
    const inputData: UnitFilterInputData<'unitId'> = overrideObject(
      generateFilterInput('unitId'),
      {keyword: '龙爸'},
    );

    // noinspection NonAsciiCharacters
    const unitIds = getFilteredUnitInfo(inputData, charaInfo, dragonInfo, {'龍爸': 10750404})
      .map((unit) => unit.id);

    expect(unitIds).toStrictEqual([10750404]);
  });
});

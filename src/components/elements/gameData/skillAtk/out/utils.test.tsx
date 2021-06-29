import {generateAttackingSkillEntry} from '../../../../../../test/data/mock/skill';
import {AttackingSkillData, ElementBonusData} from '../../../../../api-def/resources';
import {ResourceLoader} from '../../../../../utils/services/resources';
import {InputData} from '../in/types';
import {generateInputData} from '../in/utils/inputData';
import {calculateEntries, filterSkillEntries} from './utils';


const inputDataTemplate: InputData = generateInputData();

describe('Filter ATK skill entries', () => {
  let data: Array<AttackingSkillData>;

  beforeAll(async () => {
    data = await ResourceLoader.getAttackingSkillEntries();
  });

  it('returns skill entries', async () => {
    expect(data.length).toBeGreaterThan(0);
  });

  it('returns all entries if no filter', async () => {
    const dataFiltered = filterSkillEntries(inputDataTemplate, data);
    expect(dataFiltered.length).toBeGreaterThan(0);
  });

  it('returns SS only', async () => {
    const dataFiltered = filterSkillEntries(
      {
        ...inputDataTemplate,
        filter: {
          ...inputDataTemplate.filter,
          sharedOnly: true,
        },
      },
      data,
    );
    expect(dataFiltered.length).toBeGreaterThan(0);
    expect(dataFiltered.map((entry) => entry.skill.sharable)).not.toContain(false);
  });

  it('returns dispel only', async () => {
    const dataFiltered = filterSkillEntries(
      {
        ...inputDataTemplate,
        filter: {
          ...inputDataTemplate.filter,
          dispelOnly: true,
        },
      },
      data,
    );
    expect(dataFiltered.length).toBeGreaterThan(0);
    expect(dataFiltered.map((entry) => entry.skill.dispelMax)).not.toContain(false);
  });

  it('returns specified element only', async () => {
    const elemEnums = await ResourceLoader.getEnumElements();

    elemEnums.elemental.map((elemEnum) => {
      const elemEnumCode = elemEnum.code;

      const dataFiltered = filterSkillEntries(
        {
          ...inputDataTemplate,
          filter: {
            ...inputDataTemplate.filter,
            elemCodes: [elemEnumCode],
          },
        },
        data,
      );
      expect(dataFiltered.length).toBeGreaterThan(0);
      expect(dataFiltered.map((entry) => entry.chara.element === elemEnumCode)).not.toContain(false);
    });
  });

  it('returns specified affliction', async () => {
    const conditionEnums = await ResourceLoader.getEnumCategorizedConditions();

    conditionEnums.afflictions.forEach((afflictionEnum) => {
      const afflictionEnumCode = afflictionEnum.code;

      const dataFiltered = filterSkillEntries(
        {
          ...inputDataTemplate,
          filter: {
            ...inputDataTemplate.filter,
            elemCodes: [afflictionEnumCode],
          },
        },
        data,
      );
      expect(dataFiltered.map((entry) => entry.chara.element === afflictionEnumCode)).not.toContain(false);
    });
  });
});

describe('Sort ATK skill entries', () => {
  // Source of getting the unique ordered array: https://stackoverflow.com/a/34191046/11571888

  let data: Array<AttackingSkillData>;
  let elemBonusData: ElementBonusData;

  beforeAll(async () => {
    data = await ResourceLoader.getAttackingSkillEntries();
    elemBonusData = new ElementBonusData(await ResourceLoader.getElementBonusData());
  });

  it('sorts entries by damage DESC', async () => {
    const inputData: InputData = {
      ...inputDataTemplate,
      sortBy: 'damage',
    };

    const entries = calculateEntries(data, inputData, elemBonusData)
      .map((entry) => entry.skillDamage.expected)
      .filter((x, i, a) => !i || x !== a[i - 1]);
    expect(entries[0]).toBeGreaterThan(entries[1]);
    expect(entries[1]).toBeGreaterThan(entries[2]);
    expect(entries[2]).toBeGreaterThan(entries[3]);
    expect(entries[3]).toBeGreaterThan(entries[4]);
  });

  it('sorts entries by SP ASC', async () => {
    const inputData: InputData = {
      ...inputDataTemplate,
      sortBy: 'sp',
    };

    const entries = calculateEntries(data, inputData, elemBonusData)
      .map((entry) => entry.skillEntry.skill.spMax)
      .filter((x, i, a) => !i || x !== a[i - 1]);
    expect(entries[0]).toBeLessThan(entries[1]);
    expect(entries[1]).toBeLessThan(entries[2]);
    expect(entries[2]).toBeLessThan(entries[3]);
    expect(entries[3]).toBeLessThan(entries[4]);
  });

  it('sorts entries by SSP ASC', async () => {
    const inputData: InputData = {
      ...inputDataTemplate,
      sortBy: 'ssp',
    };

    const entries = calculateEntries(data, inputData, elemBonusData)
      .map((entry) => entry.skillEntry.skill.ssSp)
      .filter((x, i, a) => !i || x !== a[i - 1]);
    expect(entries[0]).toBeLessThan(entries[1]);
    expect(entries[1]).toBeLessThan(entries[2]);
    expect(entries[2]).toBeLessThan(entries[3]);
    expect(entries[3]).toBeLessThan(entries[4]);
  });

  it('sorts entries by SP efficiency DESC', async () => {
    const inputData: InputData = {
      ...inputDataTemplate,
      sortBy: 'spPer1KMod',
    };

    const entries = calculateEntries(data, inputData, elemBonusData)
      .map((entry) => entry.efficiency.spPer1KMod)
      .filter((x, i, a) => !i || x !== a[i - 1]);
    expect(entries[0]).toBeGreaterThan(entries[1]);
    expect(entries[1]).toBeGreaterThan(entries[2]);
    expect(entries[2]).toBeGreaterThan(entries[3]);
    expect(entries[3]).toBeGreaterThan(entries[4]);
  });

  it('sorts entries by SSP efficiency DESC', async () => {
    const inputData: InputData = {
      ...inputDataTemplate,
      sortBy: 'sspPer1KMod',
    };

    const entries = calculateEntries(data, inputData, elemBonusData)
      .map((entry) => entry.efficiency.sspPer1KMod)
      .filter((x, i, a) => !i || x !== a[i - 1]);
    expect(entries[0]).toBeGreaterThan(entries[1]);
    expect(entries[1]).toBeGreaterThan(entries[2]);
    expect(entries[2]).toBeGreaterThan(entries[3]);
    expect(entries[3]).toBeGreaterThan(entries[4]);
  });

  it('sorts entries by affliction duration SP efficiency DESC', async () => {
    const inputData: InputData = {
      ...inputDataTemplate,
      sortBy: 'afflictionLengthPer1KSp',
    };

    const entries = calculateEntries(data, inputData, elemBonusData)
      .map((entry) => Math.min(...Object.values(entry.efficiency.secPer1KSp)))
      .filter((x, i, a) => !i || x !== a[i - 1]);
    expect(entries[0]).toBeGreaterThan(entries[1]);
    expect(entries[1]).toBeGreaterThan(entries[2]);
    expect(entries[2]).toBeGreaterThan(entries[3]);
    expect(entries[3]).toBeGreaterThan(entries[4]);
  });

  it('sorts entries by affliction duration SSP efficiency DESC', async () => {
    const inputData: InputData = {
      ...inputDataTemplate,
      sortBy: 'afflictionLengthPer1KSsp',
    };

    const entries = calculateEntries(data, inputData, elemBonusData)
      .map((entry) => Math.min(...Object.values(entry.efficiency.secPer1KSsp)))
      .filter((x, i, a) => !i || x !== a[i - 1]);
    expect(entries[0]).toBeGreaterThan(entries[1]);
    expect(entries[1]).toBeGreaterThan(entries[2]);
    expect(entries[2]).toBeGreaterThan(entries[3]);
    expect(entries[3]).toBeGreaterThan(entries[4]);
  });
});

describe('Entry calculation', () => {
  const data: AttackingSkillData = generateAttackingSkillEntry();
  let elemBonusData: ElementBonusData;

  beforeAll(async () => {
    elemBonusData = new ElementBonusData(await ResourceLoader.getElementBonusData());
  });

  it('calculates SP efficiency', async () => {
    const dataModified: AttackingSkillData = {
      ...data,
      skill: {
        ...data.skill,
        spMax: 5000,
        modsMax: [10, 15],
        buffCountBoost: [
          {
            each: 0,
            inEffect: 0,
            limit: 0,
          },
          {
            each: 0,
            inEffect: 0,
            limit: 0,
          },
        ],
        crisisMax: [0, 0],
      },
    };

    const entry = calculateEntries([dataModified], inputDataTemplate, elemBonusData)[0];
    expect(entry.efficiency.spPer1KMod).toBe(2000);
  });

  it('calculates SSP efficiency', async () => {
    const dataModified: AttackingSkillData = {
      ...data,
      skill: {
        ...data.skill,
        ssSp: 25000,
        modsMax: [10, 15],
        buffCountBoost: [
          {
            each: 0,
            inEffect: 0,
            limit: 0,
          },
          {
            each: 0,
            inEffect: 0,
            limit: 0,
          },
        ],
        crisisMax: [0, 0],
      },
    };

    const entry = calculateEntries([dataModified], inputDataTemplate, elemBonusData)[0];
    expect(entry.efficiency.sspPer1KMod).toBe(10000);
  });

  it('calculates affliction duration SP efficiency', async () => {
    const dataModified: AttackingSkillData = {
      ...data,
      skill: {
        ...data.skill,
        spMax: 25000,
        afflictions: [
          {
            actionTime: 1.5,
            duration: 25,
            probabilityPct: 120,
            stackable: true,
            statusCode: 4,
            statusConditionCode: 0,
            statusIcon: 'afflictionIcon',
          },
          {
            actionTime: 1.5,
            duration: 50,
            probabilityPct: 120,
            stackable: true,
            statusCode: 5,
            statusConditionCode: 0,
            statusIcon: 'afflictionIcon',
          },
        ],
      },
    };

    const entry = calculateEntries([dataModified], inputDataTemplate, elemBonusData)[0];
    expect(entry.efficiency.secPer1KSp).toStrictEqual({4: 1, 5: 2});
  });

  it('calculates affliction duration SSP efficiency', async () => {
    const dataModified: AttackingSkillData = {
      ...data,
      skill: {
        ...data.skill,
        ssSp: 12500,
        afflictions: [
          {
            actionTime: 1.5,
            duration: 25,
            probabilityPct: 120,
            stackable: true,
            statusCode: 4,
            statusConditionCode: 0,
            statusIcon: 'afflictionIcon',
          },
          {
            actionTime: 1.5,
            duration: 50,
            probabilityPct: 120,
            stackable: true,
            statusCode: 5,
            statusConditionCode: 0,
            statusIcon: 'afflictionIcon',
          },
        ],
      },
    };

    const entry = calculateEntries([dataModified], inputDataTemplate, elemBonusData)[0];
    expect(entry.efficiency.secPer1KSsp).toStrictEqual({4: 2, 5: 4});
  });
});

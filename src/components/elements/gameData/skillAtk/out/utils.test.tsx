import {AttackingSkillData, ElementBonusData} from '../../../../../api-def/resources';
import {ResourceLoader} from '../../../../../utils/services/resources';
import {InputData} from '../in/types';
import {generateInputData} from '../in/utils';
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

    const entries = calculateEntries(data, inputData, elemBonusData);
    expect(entries[0].skillDamage.expected > entries[1].skillDamage.expected);
    expect(entries[1].skillDamage.expected > entries[2].skillDamage.expected);
    expect(entries[2].skillDamage.expected > entries[3].skillDamage.expected);
    expect(entries[3].skillDamage.expected > entries[4].skillDamage.expected);
  });

  it('sorts entries by SP ASC', async () => {
    const inputData: InputData = {
      ...inputDataTemplate,
      sortBy: 'sp',
    };

    const entries = calculateEntries(data, inputData, elemBonusData);
    expect(entries[0].skillEntry.skill.spMax > entries[1].skillEntry.skill.spMax);
    expect(entries[1].skillEntry.skill.spMax > entries[2].skillEntry.skill.spMax);
    expect(entries[2].skillEntry.skill.spMax > entries[3].skillEntry.skill.spMax);
    expect(entries[3].skillEntry.skill.spMax > entries[4].skillEntry.skill.spMax);
  });

  it('sorts entries by SSP ASC', async () => {
    const inputData: InputData = {
      ...inputDataTemplate,
      sortBy: 'ssp',
    };

    const entries = calculateEntries(data, inputData, elemBonusData);
    expect(entries[0].skillEntry.skill.ssSp > entries[1].skillEntry.skill.ssSp);
    expect(entries[1].skillEntry.skill.ssSp > entries[2].skillEntry.skill.ssSp);
    expect(entries[2].skillEntry.skill.ssSp > entries[3].skillEntry.skill.ssSp);
    expect(entries[3].skillEntry.skill.ssSp > entries[4].skillEntry.skill.ssSp);
  });
});

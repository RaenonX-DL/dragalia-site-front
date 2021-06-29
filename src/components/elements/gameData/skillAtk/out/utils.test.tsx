import {ResourceLoader} from '../../../../../utils/services/resources';
import {InputData} from '../in/types';
import {generateInputData} from '../in/utils';
import {filterSkillEntries} from './utils';


const inputDataTemplate: InputData = generateInputData();

describe('Filter ATK skill entries', () => {
  it('returns skill entries', async () => {
    const data = await ResourceLoader.getAttackingSkillEntries();

    expect(data.length).toBeGreaterThan(0);
  });

  it('returns all entries if no filter', async () => {
    let data = await ResourceLoader.getAttackingSkillEntries();

    data = filterSkillEntries(inputDataTemplate, data);
    expect(data.length).toBeGreaterThan(0);
  });

  it('returns SS only', async () => {
    const data = await ResourceLoader.getAttackingSkillEntries();

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
    const data = await ResourceLoader.getAttackingSkillEntries();

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
    const [elemEnums, data] = await Promise.all([
      ResourceLoader.getEnumElements(),
      ResourceLoader.getAttackingSkillEntries(),
    ]);

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
    const [conditionEnums, data] = await Promise.all([
      ResourceLoader.getEnumCategorizedConditions(),
      ResourceLoader.getAttackingSkillEntries(),
    ]);

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

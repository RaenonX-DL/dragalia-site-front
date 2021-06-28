import {ResourceLoader} from '../../../../utils/services/resources';
import {InputData} from './in/types';
import {generateInputData} from './in/utils';
import {filterSkillEntries} from './out/utils';


describe('Attacking skill entries processing', () => {
  const inputDataTemplate: InputData = generateInputData();

  it('returns skill entries', async () => {
    await ResourceLoader.getAttackingSkillEntries((data) => data)
      .then((data) => {
        expect(data.length).toBeGreaterThan(0);
      });
  });

  it('returns all entries if no filter', async () => {
    await ResourceLoader.getAttackingSkillEntries((data) => data)
      .then((data) => {
        data = filterSkillEntries(inputDataTemplate, data);
        expect(data.length).toBeGreaterThan(0);
      });
  });

  it('returns SS only', async () => {
    await ResourceLoader.getAttackingSkillEntries((data) => data)
      .then((data) => {
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
  });

  it('returns dispel only', async () => {
    await ResourceLoader.getAttackingSkillEntries((data) => data)
      .then((data) => {
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
  });

  it('returns specified element only', async () => {
    const enumElements = () => ResourceLoader.getEnumElements();
    const attackingEntries = () => ResourceLoader.getAttackingSkillEntries();

    await Promise.all([enumElements(), attackingEntries()])
      .then(([elemEnums, data]) => {
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
  });

  it('returns specified affliction', async () => {
    const enumConditions = () => ResourceLoader.getEnumCategorizedConditions();
    const attackingEntries = () => ResourceLoader.getAttackingSkillEntries();

    await Promise.all([enumConditions(), attackingEntries()])
      .then(([conditionEnums, data]) => {
        conditionEnums.afflictions.map((afflictionEnum) => {
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
});

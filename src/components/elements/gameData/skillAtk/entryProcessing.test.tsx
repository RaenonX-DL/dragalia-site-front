import {ConditionCodes} from '../../../../const/gameData';
import {ResourceLoader} from '../../../../utils/services/resources';
import {InputData} from './in/types';
import {filterSkillEntries} from './out/utils';

describe('Attacking skill entries processing', () => {
  const inputDataTemplate: InputData = {
    params: {
      atk: {
        inGame: 5000,
        conditionalPct: 0,
        buffPct: 0,
      },
      buff: {
        count: 0,
        zone: {
          self: 0,
          ally: 0,
        },
      },
      ex: {
        blade: false,
        wand: false,
      },
      crt: {
        ratePct: 0,
        damagePct: 0,
        inspired: false,
      },
      skill: {
        buffPct: 0,
        passivePct: 0,
        energized: false,
      },
      punishers: {
        bkPct: 0,
        othersPct: 0,
      },
      others: {
        elemBonusPct: 0,
        currentHpPct: 0,
      },
    },
    target: {
      elemCondCode: ConditionCodes.TARGET_ELEM_EFFECTIVE,
      afflictionCodes: [],
      def: {
        base: 0,
        downPct: 0,
        bkRate: 0.6,
      },
      state: ConditionCodes.NONE,
    },
    filter: {
      elemCodes: [],
      afflictionCondCode: [],
      sharedOnly: false,
    },
  };

  it('checks if the promise is returning data', async () => {
    await ResourceLoader.getAttackingSkillEntries((data) => data)
      .then((data) => {
        expect(data.length).toBeGreaterThan(0);
      });
  });

  it('checks if all entries are returned when no filter is applicable', async () => {
    await ResourceLoader.getAttackingSkillEntries((data) => data)
      .then((data) => {
        data = filterSkillEntries(inputDataTemplate, data);
        expect(data.length).toBeGreaterThan(0);
      });
  });

  it('checks if SS only filtering is working correctly', async () => {
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

  it('checks if elemental filtering is working correctly', async () => {
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

  it('checks if affliction filtering is working correctly', async () => {
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

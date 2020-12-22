import {ConditionCodes} from '../../../../constants/gameData';
import {ResourceLoader} from '../../../../utils/services/resources';
import {InputData} from './inputSection';
import {filterSkillEntries} from './outputMain';

const inputDataTemplate: InputData = {
  atkInGame: 5000,
  atkConditionalPct: 0,
  atkBuffPct: 0,
  buffCount: 0,
  buffZoneSelf: 0,
  buffZoneAlly: 0,
  exBlade: false,
  exWand: false,
  criticalRatePct: 0,
  criticalDamagePct: 0,
  criticalInspired: false,
  skillBuffPct: 0,
  skillPassivePct: 0,
  skillEnergized: false,
  punishersBkPct: 0,
  punishersOtherPct: 0,
  otherElemBonusPct: 0,
  targetElemCondCode: ConditionCodes.TARGET_ELEM_EFFECTIVE,
  targetAfflictionCodes: [],
  targetDefBase: 0,
  targetDefDownPct: 0,
  targetDefBkRate: 0.6,
  targetStateCode: ConditionCodes.NONE,
  filterElementCode: [],
  filterAfflictionCondCode: [],
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

it('checks if elemental filtering is working correctly', async () => {
  const enumElements = () => ResourceLoader.getEnumElements();
  const attackingEntries = () => ResourceLoader.getAttackingSkillEntries();

  await Promise.all([enumElements(), attackingEntries()])
    .then(([elemEnums, data]) => {
      elemEnums.elemental.map((elemEnum) => {
        const elemEnumCode = elemEnum.code;

        const dataFiltered = filterSkillEntries({...inputDataTemplate, filterElementCode: [elemEnumCode]}, data);
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

        const dataFiltered = filterSkillEntries({...inputDataTemplate, filterElementCode: [afflictionEnumCode]}, data);
        expect(dataFiltered.map((entry) => entry.chara.element === afflictionEnumCode)).not.toContain(false);
      });
    });
});

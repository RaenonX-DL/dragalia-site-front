import {InputData} from '../../components/elements/gameData/skillAtk/inputSection';
import {ConditionCodes} from '../../constants/gameData';
import {AttackingSkillData} from '../services/resources/types';
import {calculateDamage, CalculateDamageReturn} from './damage';


const inputDataTemplate: InputData = {
  atkInGame: 0,
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
  otherCurrentHpPct: 0,
  targetElemCondCode: ConditionCodes.TARGET_ELEM_EFFECTIVE,
  targetAfflictionCodes: [],
  targetDefBase: 0,
  targetDefDownPct: 0,
  targetDefBkRate: 0.6,
  targetStateCode: ConditionCodes.NONE,
  filterElementCode: [],
  filterAfflictionCondCode: [],
};


const attackingSkillDataTemplate: AttackingSkillData = {
  uniqueHash: '',
  condition: [],
  chara: {
    iconName: '',
    name: {
      cht: '',
      en: '',
      jp: '',
    },
    element: 0,
  },
  skill: {
    identifiers: [],
    internalId: 0,
    name: {
      cht: '',
      en: '',
      jp: '',
    },
    spMax: 0,
    sharable: false,
    ssCost: 0,
    ssSp: 0,
    modsMax: [],
    crisisMax: [],
    hitsMax: 0,
    afflictions: [],
    buffCountBoost: [],
    buffZoneBoost: {
      self: 0,
      ally: 0,
    },
    dispelMax: false,
    dispelTimingMax: [],
  },
};


it('checks if the damage is calculated correctly', () => {
  const inputData: InputData = {
    ...inputDataTemplate,
    atkInGame: 6438,
    atkConditionalPct: 20,
    atkBuffPct: 197,
    exBlade: true,
    exWand: true,
    criticalRatePct: 100,
    criticalDamagePct: 170,
    criticalInspired: false,
    skillBuffPct: 200,
    skillPassivePct: 40,
    skillEnergized: true,
    punishersBkPct: 20,
    punishersOtherPct: 50,
    otherElemBonusPct: 20,
    otherCurrentHpPct: 0,
    targetElemCondCode: ConditionCodes.TARGET_ELEM_EFFECTIVE,
    targetAfflictionCodes: [ConditionCodes.TARGET_BOGGED.valueOf()],
    targetDefBase: 10,
    targetDefDownPct: 30,
    targetDefBkRate: 0.8,
    targetStateCode: ConditionCodes.TARGET_STATE_BK,
  };

  const attackingSkillData = {
    ...attackingSkillDataTemplate,
    skill: {
      ...attackingSkillDataTemplate.skill,
      modsMax: [40, 5.45],
      crisisMax: [1, 1],
      buffCountBoost: [{inEffect: 0, each: 0, limit: 0}, {inEffect: 0, each: 0, limit: 0}],
    },
  };

  const damage: CalculateDamageReturn = calculateDamage(inputData, attackingSkillData, 1.5);

  expect(Math.round(damage.lowest)).toStrictEqual(33179044);
  expect(Math.round(damage.expected)).toStrictEqual(34925309);
  expect(Math.round(damage.highest)).toStrictEqual(36671575);
  expect(damage.totalMods).toStrictEqual(45.45);
});

import {AttackingSkillData} from '../../api-def/resources';
import {InputData} from '../../components/elements/gameData/skillAtk/in/types';
import {ConditionCodes} from '../../const/gameData';
import {calculateDamage, CalculateDamageReturn} from './damage';


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


const attackingSkillDataTemplate: AttackingSkillData = {
  uniqueHash: '',
  condition: [],
  chara: {
    id: 0,
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
    params: {
      atk: {
        inGame: 6438,
        conditionalPct: 20,
        buffPct: 197,
      },
      buff: inputDataTemplate.params.buff,
      ex: {
        blade: true,
        wand: true,
      },
      crt: {
        ratePct: 100,
        damagePct: 170,
        inspired: false,
      },
      skill: {
        buffPct: 200,
        passivePct: 40,
        energized: true,
      },
      punishers: {
        bkPct: 20,
        othersPct: 50,
      },
      others: {
        elemBonusPct: 20,
        currentHpPct: 0,
      },
    },
    target: {
      elemCondCode: ConditionCodes.TARGET_ELEM_EFFECTIVE,
      afflictionCodes: [ConditionCodes.TARGET_BOGGED.valueOf()],
      def: {
        base: 10,
        downPct: 30,
        bkRate: 0.8,
      },
      state: ConditionCodes.TARGET_STATE_BK,
    },
    filter: inputDataTemplate.filter,
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

import {generateAttackingSkillEntry} from '../../../test/data/mock/skill';
import {AttackingSkillData} from '../../api-def/resources';
import {InputData} from '../../components/elements/gameData/skillAtk/in/types';
import {generateInputData} from '../../components/elements/gameData/skillAtk/in/utils';
import {ConditionCodes} from '../../const/gameData';
import {calculateDamage, CalculateDamageReturn} from './damage';


describe('Damage calculation', () => {
  const attackingSkillDataTemplate: AttackingSkillData = generateAttackingSkillEntry();

  it('checks if the damage is calculated correctly', () => {
    const inputData: InputData = generateInputData({
      params: {
        atk: {
          inGame: 6438,
          conditionalPct: 20,
          buffPct: 197,
        },
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
    });

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
});

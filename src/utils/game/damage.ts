import {AttackingSkillData} from '../../api-def/resources';
import {InputData} from '../../components/elements/gameData/skillAtk/in/types';
import {ConditionCodes} from '../../const/gameData';

export type CalculateDamageReturn = {
  lowest: number,
  expected: number,
  highest: number,
  totalMods: number,
};


const calculateModOnCrisis = (originalMod: number, crisisMod: number, currentHpRate: number): number => {
  return originalMod * ((1 - currentHpRate) ** 2 * (crisisMod - 1) + 1);
};


export const calculateDamage = (
  inputData: InputData, attackingSkillData: AttackingSkillData, charaElementRate: number,
): CalculateDamageReturn => {
  const totalMods = attackingSkillData.skill.modsMax
    .map((mod, idx) => {
      const crisisMod = attackingSkillData.skill.crisisMax[idx];
      const buffCountBoost = attackingSkillData.skill.buffCountBoost[idx];

      // Crisis mod
      if (crisisMod !== 0) {
        mod = calculateModOnCrisis(mod, crisisMod, inputData.params.others.currentHpPct / 100);
      }

      // Buff count boost
      if (buffCountBoost.each !== 0) {
        mod /= (1 + buffCountBoost.inEffect); // Get the original mod

        const boost = buffCountBoost.inEffect + inputData.params.buff.count * buffCountBoost.each;

        mod *= (1 + Math.min(boost, buffCountBoost.limit || Infinity));
      }

      // Buff zone boost
      // - self-built buff zone
      mod *= (1 + inputData.params.buff.zone.self * attackingSkillData.skill.buffZoneBoost.self);
      // - ally-built buff zone
      mod *= (1 + inputData.params.buff.zone.ally * attackingSkillData.skill.buffZoneBoost.ally);

      return mod;
    })
    .reduce((a, b) => a + b, 0);

  let damage = 5 / 3; // Base damage

  // Damage from ATK
  damage *= (
    inputData.params.atk.inGame * // In-game ATK
    (1 + inputData.params.atk.conditionalPct / 100) * // Condition ATK boosts
    (1 + inputData.params.atk.buffPct / 100) * // ATK Buff
    (1 + (inputData.params.ex.blade ? 0.1 : 0)) // Blade EX
  );

  // Damage from skill mods
  damage *= totalMods;

  // Damage from CRT
  damage *= (
    1 +
    (inputData.params.crt.inspired ? 1 : inputData.params.crt.ratePct / 100) * // Critical Rate and Inspired
    (inputData.params.crt.damagePct / 100 + 0.7) // Critical damage
  );

  // Damage from skill boosts
  damage *= (
    // Passives and Energized
    (1 + (inputData.params.skill.passivePct + (inputData.params.skill.energized ? 50 : 0)) / 100) *
    (1 + (inputData.params.ex.wand ? 0.15 : 0)) * // Wand EX
    (1 + inputData.params.skill.buffPct / 100) // Skill Damage Buffs
  );

  // Damage from punishers
  damage *= (
    (1 + inputData.params.punishers.bkPct / 100) *
    (1 + inputData.params.punishers.othersPct / 100)
  );

  // Damage from elemental rate and bonuses
  damage *= (charaElementRate + inputData.params.others.elemBonusPct / 100);

  // Base DEF
  damage /= inputData.target.def.base;

  // DEF change
  damage /= (
    (inputData.target.state === ConditionCodes.TARGET_STATE_BK ? inputData.target.def.bkRate : 1) * // BK DEF change
    (1 - inputData.target.def.downPct / 100) // DEF down
  );

  // Special - Bog
  damage *= inputData.target.afflictionCodes.includes(ConditionCodes.TARGET_BOGGED) ? 1.5 : 1;

  return {
    lowest: damage * 0.95,
    expected: damage,
    highest: damage * 1.05,
    totalMods: totalMods,
  };
};

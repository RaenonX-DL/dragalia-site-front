import {InputData} from '../../components/elements/gameData';
import {ConditionCodes} from '../../constants/gameData';

export type CalculateDamageReturn = {
  lowest: number,
  expected: number,
  highest: number
};

// TEST: test the damage calculation accuracy
export const calculateDamage = (
  inputData: InputData, skillTotalMods: number, charaElementRate: number,
): CalculateDamageReturn => {
  let damage = 5 / 3; // Base damage

  // Damage from ATK
  damage *= (
    inputData.atkInGame * // In-game ATK
    (1 + inputData.atkConditionalPct / 100) * // Condition ATK boosts
    (1 + inputData.atkBuffPct / 100) * // ATK Buff
    (1 + (inputData.exBlade ? 0.1 : 0)) // Blade EX
  );

  // Damage from skill mods
  damage *= skillTotalMods;

  // Damage from CRT
  damage *= (
    1 +
    (inputData.criticalInspired ? 1 : inputData.criticalRatePct / 100) * // Critical Rate and Inspired
    (inputData.criticalDamagePct / 100 + 0.7) // Critical damage
  );

  // Damage from skill boosts
  damage *= (
    (1 + (inputData.skillPassivePct + (inputData.skillEnergized ? 50 : 0)) / 100) * // Passives and Energized
    (1 + (inputData.exWand ? 0.15 : 0)) * // Wand EX
    (1 + inputData.skillBuffPct / 100) // Skill Damage Buffs
  );

  // Damage from punishers
  damage *= (
    (1 + inputData.punishersBkPct / 100) *
    (1 + inputData.punishersOtherPct / 100)
  );

  // Damage from elemental rate and bonuses
  damage *= (charaElementRate + inputData.otherElemBonusPct / 100);

  // Base DEF
  damage /= inputData.targetDefBase;

  // DEF change
  damage /= (
    (inputData.targetStateCode === ConditionCodes.TARGET_STATE_BK ? inputData.targetDefBkRate : 1) * // BK DEF change
    (1 - inputData.targetDefDownPct / 100) // DEF down
  );

  // Special - Bog
  damage *= inputData.targetAfflictionCodes.includes(ConditionCodes.TARGET_BOGGED) ? 1.5 : 1;

  return {
    lowest: damage * 0.95,
    expected: damage,
    highest: damage * 1.05,
  };
};

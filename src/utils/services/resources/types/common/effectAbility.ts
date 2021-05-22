import {EffectUnitDataBase} from './effect';
import {MultiLangText} from './text';

export type AbilityVariantEffectUnitData = EffectUnitDataBase & {
  sourceAbilityId: number,
  conditions: Array<number>,
  cooldownSec: number,
  maxOccurrences: number,
  rateMax: number,
  targetAction: MultiLangText,
}

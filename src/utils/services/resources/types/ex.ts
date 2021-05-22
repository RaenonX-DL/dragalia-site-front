import {CharaData} from './common/chara';
import {AbilityVariantEffectUnitData} from './common/effectAbility';

export type CharaExAbilityDataEntry = {
  chara: CharaData,
  ex: Array<AbilityVariantEffectUnitData>,
  chainedEx: Array<AbilityVariantEffectUnitData>,
}

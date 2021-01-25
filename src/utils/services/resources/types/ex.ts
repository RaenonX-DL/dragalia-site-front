import {AbilityVariantEffectUnitData} from './common/ability';
import {CharaData} from './common/chara';


export type ExAbilityDataEntry = {
  chainedEx: Array<AbilityVariantEffectUnitData>,
  ex: Array<AbilityVariantEffectUnitData>,
  chara: CharaData,
}

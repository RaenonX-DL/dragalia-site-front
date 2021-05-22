import {MultiLangText} from './text';

export type EffectUnitDataBase = {
  status: MultiLangText,
  target: MultiLangText,
  parameter: {
    name: MultiLangText,
    code: number,
    imagePath: string
  },
  paramUnit: {
    name: MultiLangText,
    code: number,
    isPercentage: boolean
  },
  probabilityPct: number,
  rate: number,
  slipInterval: number,
  slipDamageMod: number,
  durationCount: number,
  durationSec: number,
  maxStackCount: number,
  stackable: boolean
}

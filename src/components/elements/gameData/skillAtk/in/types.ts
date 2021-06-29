import {CategorizedConditionEnums, ElementEnums} from '../../../../../api-def/resources/types/export/enums';
import {ConditionCodes} from '../../../../../const/gameData';
import {InputPanelCommonProps} from '../../../input/types';


export type SortBy =
  'damage' |
  'sp' |
  'ssp' |
  'modPer1KSp' |
  'modPer1KSsp' |
  'afflictionLengthPer1KSp' |
  'afflictionLengthPer1KSsp'

export type InputData = {
  params: {
    atk: {
      inGame: number,
      conditionalPct: number,
      buffPct: number,
    },
    buff: {
      count: number,
      zone: {
        self: number,
        ally: number,
      },
    },
    ex: {
      blade: boolean,
      wand: boolean,
    },
    crt: {
      ratePct: number,
      damagePct: number,
      inspired: boolean,
    },
    skill: {
      buffPct: number,
      passivePct: number,
      energized: boolean,
    },
    punishers: {
      bkPct: number,
      othersPct: number,
    },
    others: {
      elemBonusPct: number,
      currentHpPct: number,
    },
  },
  target: {
    elemCondCode: number,
    afflictionCodes: Array<number>,
    def: {
      base: number,
      downPct: number,
      bkRate: number,
    },
    state: ConditionCodes.NONE | ConditionCodes.TARGET_STATE_BK | ConditionCodes.TARGET_STATE_OD,
  },
  filter: {
    elemCodes: Array<number>,
    afflictionCondCode: Array<number>,
    sharedOnly: boolean,
    dispelOnly: boolean,
  },
  display: {
    actualDamage: boolean,
    // Damage mod / Hit count
    damageInfo: boolean,
    damageDist: boolean,
    affliction: boolean,
    // SS / SSP / SS Cost
    spInfo: boolean,
    // Hit timings, cancellation info, animation duration
    animationInfo: boolean,
  }
  sortBy: SortBy,
}

export type SectionProps = InputPanelCommonProps<InputData>

export type SectionPropsCondEnums = SectionProps & {
  conditionEnums: CategorizedConditionEnums
}

export type SectionPropsElemEnums = SectionProps & {
  elementEnums: ElementEnums
}

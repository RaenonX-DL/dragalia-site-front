import {ConditionCodes} from '../../../../../const/gameData';


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
  },
}

import {SupportedLanguages} from '../../../../../api-def/api/other/lang';
import {ConditionCodes} from '../../../../../const/gameData';
import {translations} from '../../../../../i18n/translations/main';
import {DeepPartial} from '../../../../../utils/types';
import {InputData} from './types';


export const overwriteInputData = (original: InputData, overwrite: DeepPartial<InputData>): InputData => ({
  params: {
    atk: {
      inGame: overwrite?.params?.atk?.inGame ?? original.params.atk.inGame,
      conditionalPct: overwrite?.params?.atk?.conditionalPct ?? original.params.atk.conditionalPct,
      buffPct: overwrite?.params?.atk?.buffPct ?? original.params.atk.buffPct,
    },
    buff: {
      count: overwrite?.params?.buff?.count ?? original.params.buff.count,
      zone: {
        self: overwrite?.params?.buff?.zone?.self ?? original.params.buff.zone.self,
        ally: overwrite?.params?.buff?.zone?.ally ?? original.params.buff.zone.ally,
      },
    },
    ex: {
      blade: overwrite?.params?.ex?.blade ?? original.params.ex.blade,
      wand: overwrite?.params?.ex?.wand ?? original.params.ex.wand,
    },
    crt: {
      ratePct: overwrite?.params?.crt?.ratePct ?? original.params.crt.ratePct,
      damagePct: overwrite?.params?.crt?.damagePct ?? original.params.crt.damagePct,
      inspired: overwrite?.params?.crt?.inspired ?? original.params.crt.inspired,
    },
    skill: {
      buffPct: overwrite?.params?.skill?.buffPct ?? original.params.skill.buffPct,
      passivePct: overwrite?.params?.skill?.passivePct ?? original.params.skill.passivePct,
      energized: overwrite?.params?.skill?.energized ?? original.params.skill.energized,
    },
    punishers: {
      bkPct: overwrite?.params?.punishers?.bkPct ?? original.params.punishers.bkPct,
      othersPct: overwrite?.params?.punishers?.othersPct ?? original.params.punishers.othersPct,
    },
    others: {
      elemBonusPct: overwrite?.params?.others?.elemBonusPct ?? original.params.others.elemBonusPct,
      currentHpPct: overwrite?.params?.others?.currentHpPct ?? original.params.others.currentHpPct,
    },
  },
  target: {
    elemCondCode: overwrite?.target?.elemCondCode ?? original.target.elemCondCode,
    afflictionCodes: overwrite?.target?.afflictionCodes ?? original.target.afflictionCodes,
    def: {
      base: overwrite?.target?.def?.base ?? original.target.def.base,
      downPct: overwrite?.target?.def?.downPct ?? original.target.def.downPct,
      bkRate: overwrite?.target?.def?.bkRate ?? original.target.def.bkRate,
    },
    state: overwrite?.target?.state ?? original.target.state,
  },
  filter: {
    elemCodes: overwrite?.filter?.elemCodes ?? original.filter.elemCodes,
    afflictionCondCode: overwrite?.filter?.afflictionCondCode ?? original.filter.afflictionCondCode,
    sharedOnly: overwrite?.filter?.sharedOnly ?? original.filter.sharedOnly,
    dispelOnly: overwrite?.filter?.dispelOnly ?? original.filter.dispelOnly,
  },
  display: {
    actualDamage: overwrite?.display?.actualDamage ?? original.display.actualDamage,
    damageInfo: overwrite?.display?.damageInfo ?? original.display.damageInfo,
    damageDist: overwrite?.display?.damageDist ?? original.display.damageDist,
    affliction: overwrite?.display?.affliction ?? original.display.affliction,
    spInfo: overwrite?.display?.spInfo ?? original.display.spInfo,
    animationInfo: overwrite?.display?.animationInfo ?? original.display.animationInfo,
  },
  sortBy: overwrite?.sortBy ?? original.sortBy,
});

export const generateInputData = (overwrite?: DeepPartial<InputData>): InputData => overwriteInputData(
  {
    // These default values will be used when initializing the parameter input for ATK skill lookup
    params: {
      atk: {
        inGame: 7000,
        conditionalPct: 20,
        buffPct: 30,
      },
      buff: {
        count: 0,
        zone: {
          self: 0,
          ally: 0,
        },
      },
      ex: {
        blade: true,
        wand: true,
      },
      crt: {
        ratePct: 4,
        damagePct: 0,
        inspired: false,
      },
      skill: {
        buffPct: 0,
        passivePct: 40,
        energized: false,
      },
      punishers: {
        bkPct: 0,
        othersPct: 20,
      },
      others: {
        elemBonusPct: 0,
        currentHpPct: 100,
      },
    },
    target: {
      elemCondCode: ConditionCodes.TARGET_ELEM_EFFECTIVE,
      afflictionCodes: [],
      def: {
        base: 10,
        downPct: 0,
        bkRate: 0.8,
      },
      state: ConditionCodes.NONE,
    },
    filter: {
      elemCodes: [],
      afflictionCondCode: [],
      sharedOnly: false,
      dispelOnly: false,
    },
    display: {
      actualDamage: false,
      damageInfo: true,
      damageDist: false,
      affliction: true,
      spInfo: true,
      animationInfo: false,
    },
    sortBy: 'damage',
  },
  overwrite || {},
);

export const validateInputData = (
  inputData: InputData,
  lang: SupportedLanguages,
  onInvalid: (errorMessage: string) => void,
) => {
  const displayInfoCount = Object.values(inputData.display).filter((display) => display).length;

  if (!displayInfoCount) {
    onInvalid(translations[lang].game.skillAtk.error.noInfoToDisplay);
    return false;
  }

  return true;
};

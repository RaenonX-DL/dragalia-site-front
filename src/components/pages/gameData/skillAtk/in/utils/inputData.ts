import {SupportedLanguages} from '../../../../../../api-def/api';
import {ConditionCodes} from '../../../../../../const/gameData';
import {translations} from '../../../../../../i18n/translations/main';
import {overrideObject} from '../../../../../../utils/override';
import {DeepPartial} from '../../../../../../utils/types';
import {InputData} from '../types';


export const overrideInputData = (
  original: InputData, override: DeepPartial<InputData>,
): InputData => overrideObject(original, override, {originalOnly: true});

export const generateInputData = (override?: DeepPartial<InputData>): InputData => overrideInputData(
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
      dragon: {
        facilityPct: 50,
        passivePct: 0,
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
      type: [],
      ssCostMax: 0,
    },
    display: {
      actualDamage: false,
      damageInfo: true,
      damageDist: false,
      affliction: true,
      spInfo: true,
      animationInfo: false,
    },
    sortBy: 'mods',
  },
  override || {},
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

import {SupportedLanguages, UnitType} from '../../../src/api-def/api';
import {CharaExAbilityDataEntry, Element, Weapon} from '../../../src/api-def/resources';


export const generateExAbilityDataEntry = (): CharaExAbilityDataEntry => {
  return {
    chara: {
      type: UnitType.CHARACTER,
      element: Element.FLAME,
      iconName: 'icon',
      rarity: 5,
      id: 10950101,
      name: {
        [SupportedLanguages.CHT]: 'CHT name',
        [SupportedLanguages.EN]: 'EN name',
        [SupportedLanguages.JP]: 'JP name',
      },
      cvEn: {
        [SupportedLanguages.CHT]: 'CHT EN CV name',
        [SupportedLanguages.EN]: 'EN EN CV name',
        [SupportedLanguages.JP]: 'JP EN CV name',
      },
      cvJp: {
        [SupportedLanguages.CHT]: 'CHT JP CV name',
        [SupportedLanguages.EN]: 'EN JP CV name',
        [SupportedLanguages.JP]: 'JP JP CV name',
      },
      releaseEpoch: 1,
      weapon: Weapon.SWORD,
      hasUniqueDragon: false,
    },
    ex: [{
      conditions: [],
      cooldownSec: 0,
      durationCount: 0,
      durationSec: 0,
      maxOccurrences: 0,
      maxStackCount: 0,
      paramUnit: {
        code: 0,
        isPercentage: false,
        name: {
          [SupportedLanguages.CHT]: '%',
          [SupportedLanguages.EN]: '%',
          [SupportedLanguages.JP]: '%',
        },
      },
      parameter: {
        code: 0,
        imagePath: '',
        name: {
          [SupportedLanguages.CHT]: 'EX CHT',
          [SupportedLanguages.EN]: 'EX EN',
          [SupportedLanguages.JP]: 'EX JP',
        },
      },
      probabilityPct: 100,
      rate: 0,
      rateMax: 0,
      slipDamageMod: 0,
      slipInterval: 0,
      sourceAbilityId: 0,
      stackable: false,
      status: {
        [SupportedLanguages.CHT]: 'EX CHT',
        [SupportedLanguages.EN]: 'EX EN',
        [SupportedLanguages.JP]: 'EX JP',
      },
      target: {
        [SupportedLanguages.CHT]: 'EX CHT',
        [SupportedLanguages.EN]: 'EX EN',
        [SupportedLanguages.JP]: 'EX JP',
      },
      targetAction: {
        [SupportedLanguages.CHT]: 'EX CHT',
        [SupportedLanguages.EN]: 'EX EN',
        [SupportedLanguages.JP]: 'EX JP',
      },
    }],
    chainedEx: [{
      conditions: [],
      cooldownSec: 0,
      durationCount: 0,
      durationSec: 0,
      maxOccurrences: 0,
      maxStackCount: 0,
      paramUnit: {
        code: 0,
        isPercentage: false,
        name: {
          [SupportedLanguages.CHT]: '%',
          [SupportedLanguages.EN]: '%',
          [SupportedLanguages.JP]: '%',
        },
      },
      parameter: {
        code: 0,
        imagePath: '',
        name: {
          [SupportedLanguages.CHT]: 'EX CHT',
          [SupportedLanguages.EN]: 'EX EN',
          [SupportedLanguages.JP]: 'EX JP',
        },
      },
      probabilityPct: 100,
      rate: 0,
      rateMax: 0,
      slipDamageMod: 0,
      slipInterval: 0,
      sourceAbilityId: 0,
      stackable: false,
      status: {
        [SupportedLanguages.CHT]: 'EX CHT',
        [SupportedLanguages.EN]: 'EX EN',
        [SupportedLanguages.JP]: 'EX JP',
      },
      target: {
        [SupportedLanguages.CHT]: 'EX CHT',
        [SupportedLanguages.EN]: 'EX EN',
        [SupportedLanguages.JP]: 'EX JP',
      },
      targetAction: {
        [SupportedLanguages.CHT]: 'EX CHT',
        [SupportedLanguages.EN]: 'EX EN',
        [SupportedLanguages.JP]: 'EX JP',
      },
    }],
  };
};

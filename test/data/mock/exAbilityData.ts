import {SupportedLanguages} from '../../../src/api-def/api';
import {CharaExAbilityDataEntry, Element} from '../../../src/api-def/resources';


export const generateExAbilityDataEntry = (): CharaExAbilityDataEntry => {
  return {
    chara: {
      element: Element.FLAME,
      iconName: 'icon',
      id: 10950101,
      name: {
        [SupportedLanguages.CHT]: 'CHT name',
        [SupportedLanguages.EN]: 'EN name',
        [SupportedLanguages.JP]: 'JP name',
      },
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

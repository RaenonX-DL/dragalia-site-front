import {SupportedLanguages} from '../../../src/api-def/api';
import {AttackingSkillData, Element} from '../../../src/api-def/resources';
import {CalculatedSkillEntry} from '../../../src/components/elements/gameData/skillAtk/out/types';


export const generateAttackingSkillEntry = (): AttackingSkillData => ({
  chara: {
    id: 10999999,
    element: Element.FLAME,
    iconName: 'icon',
    name: {
      [SupportedLanguages.CHT]: 'CHT name',
      [SupportedLanguages.EN]: 'EN name',
      [SupportedLanguages.JP]: 'JP name',
    },
  },
  condition: [],
  skill: {
    afflictions: [{
      actionTime: 1.5,
      duration: 15,
      probabilityPct: 120,
      stackable: true,
      statusCode: 5,
      statusConditionCode: 0,
      statusIcon: 'afflictionIcon',
    }],
    buffCountBoost: [{
      each: 0,
      inEffect: 0,
      limit: 0,
    }],
    buffZoneBoost: {
      self: 0,
      ally: 0,
    },
    crisisMax: [0],
    dispelMax: false,
    dispelTimingMax: [],
    hitsMax: 0,
    identifiers: ['s1'],
    internalId: 109501011,
    modsMax: [7],
    name: {
      [SupportedLanguages.CHT]: 'CHT skill',
      [SupportedLanguages.EN]: 'EN skill',
      [SupportedLanguages.JP]: 'JP skill',
    },
    sharable: false,
    spMax: 9999,
    ssCost: 5,
    ssSp: 17777,
    hitTimingSecMax: [],
    cancelActionsMax: [],
  },
  uniqueHash: 'hash',
});

export const generateCalculatedEntry = (): CalculatedSkillEntry => ({
  skillEntry: generateAttackingSkillEntry(),
  skillDamage: {
    expected: 12500,
    highest: 15000,
    lowest: 10000,
    totalMods: 7,
  },
  efficiency: {
    spPer1KMod: 1000,
    sspPer1KMod: 1200,
    secPer1KSp: {
      1: 2.5757575757,
      2: 5.0131313131,
    },
    secPer1KSsp: {
      3: 3.5757575757,
      4: 6.0131313131,
    },
  },
});

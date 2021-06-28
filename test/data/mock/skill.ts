import {SupportedLanguages} from '../../../src/api-def/api';
import {AttackingSkillData, Element} from '../../../src/api-def/resources';


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
    buffCountBoost: [],
    buffZoneBoost: {
      self: 0,
      ally: 0,
    },
    crisisMax: [],
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

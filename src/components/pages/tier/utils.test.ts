import {generateUnitTierNote} from '../../../../test/data/mock/tierNote';
import {PartiallySupportedLanguages, SupportedLanguages, UnitType} from '../../../api-def/api';
import {Element, UnitInfoData} from '../../../api-def/resources';
import {overrideObject} from '../../../utils/override';
import {categorizeEntryPack} from './utils';


describe('Categorize entry pack', () => {
  const unitInfo: UnitInfoData = {
    type: UnitType.CHARACTER,
    element: Element.FLAME,
    iconName: 'icon',
    rarity: 5,
    id: 10950101,
    name: {
      [SupportedLanguages.CHT]: 'CHT name',
      [SupportedLanguages.EN]: 'EN name',
      [SupportedLanguages.JP]: 'JP name',
      [PartiallySupportedLanguages.CHS]: 'CHS name',
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
  };

  const tierNote = overrideObject(generateUnitTierNote(), {
    points: [],
    tier: {
      conAi: {
        ranking: 'A',
        note: 'note',
        isCompDependent: false,
      },
    },
  });

  it('returns entries in certain dimension', async () => {
    const categorized = categorizeEntryPack('conAi', [{unitInfo, tierNote}]);

    expect(categorized.find((entry) => entry.ranking === 'S')?.entries).toHaveLength(0);
    expect(categorized.find((entry) => entry.ranking === 'A')?.entries[0])
      .toStrictEqual({unitInfo, tierNote});
    expect(categorized.find((entry) => entry.ranking === 'B')?.entries).toHaveLength(0);
    expect(categorized.find((entry) => entry.ranking === 'C')?.entries).toHaveLength(0);
  });

  it('returns empty array if not available', async () => {
    const categorized = categorizeEntryPack('conAi', []);

    expect(categorized.every((entry) => entry.entries.length === 0)).toBeTruthy();
  });
});

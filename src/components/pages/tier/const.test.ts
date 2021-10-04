import {generateUnitTierNote} from '../../../../test/data/mock/tierNote';
import {generateGalaMymInfo} from '../../../../test/data/mock/unitInfo';
import {overrideObject} from '../../../utils/override';
import {sortFunc} from './const';
import {EntryPack} from './types';


describe('Sorting function', () => {
  const unitInfo = generateGalaMymInfo();

  const tierNote1 = overrideObject(generateUnitTierNote(), {
    tier: {
      conCoop: {
        isCompDependent: false,
        ranking: 'A',
        note: 'Some note.',
      },
    },
  });

  const tierNote2 = overrideObject(generateUnitTierNote(), {
    tier: {
      conAi: {
        isCompDependent: false,
        ranking: 'B',
        note: 'Some note.',
      },
      conCoop: {
        isCompDependent: true,
        ranking: 'B',
        note: 'Some other note.',
      },
    },
    lastUpdateEpoch: 1578734262003,
  });

  it('ignores N/A ranking when sorting in average ranking', async () => {
    const entries: Array<EntryPack> = [
      {unitInfo, tierNote: tierNote1},
      {unitInfo, tierNote: tierNote2},
    ];

    const updateEpoch = entries.sort(sortFunc.avgRanking).map((entry) => entry.tierNote.lastUpdateEpoch);
    expect(updateEpoch).toStrictEqual([1618734262003, 1578734262003]);
  });
});

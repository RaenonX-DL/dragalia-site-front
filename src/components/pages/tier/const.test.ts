import {UnitTierNote, UnitType} from '../../../api-def/api';
import {UnitInfoData} from '../../../api-def/resources';
import {sortFunc} from './const';
import {EntryPack} from './types';


describe('Sorting function', () => {
  const unitInfo: UnitInfoData = {
    type: UnitType.CHARACTER,
    cvEn: {
      cht: 'Kelly Marie',
      en: 'Kelly Marie',
      jp: 'Kelly Marie',
    },
    cvJp: {
      cht: '遠藤綾',
      en: 'Aya Endo',
      jp: '遠藤綾',
    },
    element: 1,
    iconName: '100010_04_r05',
    id: 10550101,
    name: {
      cht: '慕慕（龍絆日Ver.）',
      en: 'Gala Mym',
      jp: 'ムム（ドラフェスVer.）',
    },
    rarity: 5,
    releaseEpoch: 1609480800.0,
  };

  const tierNote1: UnitTierNote = {
    tier: {
      conCoop: {
        isCompDependent: false,
        ranking: 'A',
        note: 'Some note.',
      },
    },
    lastUpdateEpoch: 1618734262003,
  };

  const tierNote2: UnitTierNote = {
    points: ['61174cef5dc5094fe82e9eea'],
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
  };

  it('ignores N/A ranking when sorting in average ranking', async () => {
    const entries: Array<EntryPack> = [
      {unitInfo, tierNote: tierNote1},
      {unitInfo, tierNote: tierNote2},
    ];

    const updateEpoch = entries.sort(sortFunc.avgRanking).map((entry) => entry.tierNote.lastUpdateEpoch);
    expect(updateEpoch).toStrictEqual([1618734262003, 1578734262003]);
  });
});

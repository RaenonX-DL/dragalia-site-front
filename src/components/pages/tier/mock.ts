// ----------------------- TYPES

export type Ranking = 'S' | 'A' | 'B' | 'C'

export const RankingScore: { [ranking in Ranking]: number } = {
  S: 4,
  A: 3,
  B: 2,
  C: 1,
};

// This is exactly the displaying layout in tier list page
export const Dimension = {
  conSolo: 'conSolo', conAi: 'conAi', conCoop: 'conCoop',
  normalSolo: 'normalSolo', normalAi: 'normalAi', normalCoop: 'normalCoop',
  sharedSkill: 'sharedSkill',
};

export type DimensionKey = keyof typeof Dimension;

export type TierNote = {
  isCompDependent: boolean,
  ranking: Ranking,
  note: string,
}

export type UnitTierNote = {
  points?: Array<string>,
  tier: { [dim in DimensionKey]?: TierNote },
  lastUpdateEpoch: number,
}

export type UnitTierData = { [unitId in number]: UnitTierNote }

// ----------------------- DATA

export const unitTierData: UnitTierData = {
  10650503: {
    points: ['61174cef5dc5094fe82e9ee9'],
    tier: {
      conSolo: {
        isCompDependent: false,
        ranking: 'S',
        note: 'Some note.',
      },
    },
    lastUpdateEpoch: 1628734262003,
  },
  10950501: {
    tier: {
      conCoop: {
        isCompDependent: false,
        ranking: 'A',
        note: 'Some note.',
      },
    },
    lastUpdateEpoch: 1628534262003,
  },
  10950502: {
    tier: {
      conCoop: {
        isCompDependent: false,
        ranking: 'B',
        note: 'Some note.',
      },
    },
    lastUpdateEpoch: 1618734262003,
  },
  10750404: {
    points: ['61174cef5dc5094fe82e9eea', '61174cef5dc5094fe82e9ee9'],
    tier: {
      conSolo: {
        isCompDependent: false,
        ranking: 'C',
        note: 'Some note.',
      },
      conAi: {
        isCompDependent: false,
        ranking: 'S',
        note: 'Some note.',
      },
      conCoop: {
        isCompDependent: true,
        ranking: 'A',
        note: 'Some other note.',
      },
      normalSolo: {
        isCompDependent: false,
        ranking: 'B',
        note: 'Some other note.',
      },
      normalCoop: {
        isCompDependent: true,
        ranking: 'A',
        note: 'Some other note.',
      },
      normalAi: {
        isCompDependent: false,
        ranking: 'S',
        note: 'Some note.',
      },
      sharedSkill: {
        isCompDependent: false,
        ranking: 'C',
        note: 'Some note.',
      },
    },
    lastUpdateEpoch: 1578734262003,
  },
  10950402: {
    tier: {
      conSolo: {
        isCompDependent: false,
        ranking: 'C',
        note: 'Some other note 2.',
      },
      conCoop: {
        isCompDependent: true,
        ranking: 'B',
        note: 'Some other note.',
      },
    },
    lastUpdateEpoch: 1598734262003,
  },
};

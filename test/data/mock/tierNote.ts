import {KeyPointData, UnitTierNote} from '../../../src/api-def/api';


export const generateUnitTierNote = (): UnitTierNote => ({
  points: ['id1'],
  tier: {
    conCoop: {
      isCompDependent: true,
      ranking: 'B',
      note: 'Some note.',
    },
  },
  lastUpdateEpoch: 1618734262003,
});


export const generateKeyPointData = (): KeyPointData => ({
  id1: {
    type: 'strength',
    description: 'point',
  },
});

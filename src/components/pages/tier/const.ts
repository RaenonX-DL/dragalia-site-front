import {Property} from 'csstype';

import {Dimension, DimensionKey, KeyPointType, Ranking} from '../../../api-def/api';
import {GetTranslationFunction} from '../../../i18n/types';
import {sum} from '../../../utils/calc';
import {sortAscending, sortDescending} from '../../../utils/sort';
import {EntryPack, SortOrder} from './types';
import {getTierRanking} from './utils';


export const MaxEntriesToDisplay = 50;

type SortFuncLookup = {[sortBy in SortOrder]: (entryA: EntryPack, entryB: EntryPack) => number};

export const sortFunc: SortFuncLookup = {
  unitId: sortAscending({getComparer: (element) => element.unitInfo.id}),
  conSolo: sortDescending({getComparer: (element) => getTierRanking(element.tierNote, 'conSolo')}),
  conAi: sortDescending({getComparer: (element) => getTierRanking(element.tierNote, 'conAi')}),
  conCoop: sortDescending({getComparer: (element) => getTierRanking(element.tierNote, 'conCoop')}),
  normalSolo: sortDescending({getComparer: (element) => getTierRanking(element.tierNote, 'normalSolo')}),
  normalAi: sortDescending({getComparer: (element) => getTierRanking(element.tierNote, 'normalAi')}),
  normalCoop: sortDescending({getComparer: (element) => getTierRanking(element.tierNote, 'normalCoop')}),
  sharedSkill: sortDescending({getComparer: (element) => getTierRanking(element.tierNote, 'sharedSkill')}),
  kaleidoscape: sortDescending({getComparer: (element) => getTierRanking(element.tierNote, 'kaleidoscape')}),
  avgRanking: sortDescending({
    getComparer: (element) => {
      const dimensionKeys = Object.keys(Dimension);

      const total = sum(dimensionKeys.map((dimension) => getTierRanking(element.tierNote, dimension as DimensionKey)));
      const count = dimensionKeys.filter((dimension) => !!element.tierNote.tier[dimension as DimensionKey]).length;

      return total / count;
    },
  }),
  lastUpdated: sortDescending({getComparer: (element) => element.tierNote.lastUpdateEpoch}),
};

export const orderName: {[sortBy in SortOrder]: GetTranslationFunction} = {
  lastUpdated: (t) => t.game.unitTier.sort.lastUpdated,
  avgRanking: (t) => t.game.unitTier.sort.avgRanking,
  conSolo: (t) => t.game.unitTier.dimension.conSolo,
  conAi: (t) => t.game.unitTier.dimension.conAi,
  conCoop: (t) => t.game.unitTier.dimension.conCoop,
  normalSolo: (t) => t.game.unitTier.dimension.normalSolo,
  normalAi: (t) => t.game.unitTier.dimension.normalAi,
  normalCoop: (t) => t.game.unitTier.dimension.normalCoop,
  sharedSkill: (t) => t.game.unitTier.dimension.sharedSkill,
  kaleidoscape: (t) => t.game.unitTier.dimension.kaleidoscape,
  unitId: (t) => t.game.unitTier.sort.unitId,
};

export const rankingColor: {[ranking in Ranking]: Property.Color} = {
  S: '#51dcd8',
  A: '#56d951',
  B: '#e8c945',
  C: '#e34f4b',
};

export const pointTypeWrapperClassName: {[type in KeyPointType]: string} = {
  strength: 'text-success',
  weakness: 'text-danger',
  trait: 'text-light-gray',
};

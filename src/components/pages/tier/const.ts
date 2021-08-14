import {Property} from 'csstype';

import {KeyPointType} from '../../../api-def/api';
import {GetTranslationFunction} from '../../../i18n/types';
import {sum} from '../../../utils/calc';
import {sortAscending, sortDescending} from '../../../utils/sort';
import {Dimension, DimensionKey, Ranking} from './mock';
import {EntryPack, SortOrder} from './types';
import {getTierRanking} from './utils';


export const MaxEntriesToDisplay = 50;

type SortFuncLookup = { [sortBy in SortOrder]: (entryA: EntryPack, entryB: EntryPack) => number };

export const sortFunc: SortFuncLookup = {
  unitId: sortAscending({getComparer: (element) => element.unitInfo.id}),
  conSolo: sortDescending({getComparer: (element) => getTierRanking(element.tierNote, 'conSolo')}),
  conAi: sortDescending({getComparer: (element) => getTierRanking(element.tierNote, 'conAi')}),
  conCoop: sortDescending({getComparer: (element) => getTierRanking(element.tierNote, 'conCoop')}),
  normalSolo: sortDescending({getComparer: (element) => getTierRanking(element.tierNote, 'normalSolo')}),
  normalAi: sortDescending({getComparer: (element) => getTierRanking(element.tierNote, 'normalAi')}),
  normalCoop: sortDescending({getComparer: (element) => getTierRanking(element.tierNote, 'normalCoop')}),
  sharedSkill: sortDescending({getComparer: (element) => getTierRanking(element.tierNote, 'sharedSkill')}),
  avgRanking: sortDescending({
    getComparer: (element) => {
      const dimensionKeys = Object.keys(Dimension);

      const total = sum(dimensionKeys.map((dimension) => getTierRanking(element.tierNote, dimension as DimensionKey)));
      const count = dimensionKeys.filter((dimension) => !!element.tierNote.tier[dimension as DimensionKey]).length;

      return total / count;
    },
  }),
};

export const orderName: { [sortBy in SortOrder]: GetTranslationFunction } = {
  unitId: (t) => t.game.unitTier.sort.unitId,
  avgRanking: (t) => t.game.unitTier.sort.avgRanking,
  conSolo: (t) => t.game.unitTier.dimension.conSolo.name,
  conAi: (t) => t.game.unitTier.dimension.conAi.name,
  conCoop: (t) => t.game.unitTier.dimension.conCoop.name,
  normalSolo: (t) => t.game.unitTier.dimension.normalSolo.name,
  normalAi: (t) => t.game.unitTier.dimension.normalAi.name,
  normalCoop: (t) => t.game.unitTier.dimension.normalCoop.name,
  sharedSkill: (t) => t.game.unitTier.dimension.sharedSkill.name,
};

export const rankingColor: { [ranking in Ranking]: Property.Color } = {
  S: '#51dcd8',
  A: '#56d951',
  B: '#e8c945',
  C: '#e34f4b',
};

export const keyPointTypeName: { [type in KeyPointType]: GetTranslationFunction } = {
  strength: (t) => t.game.unitTier.points.strength,
  weakness: (t) => t.game.unitTier.points.weakness,
};

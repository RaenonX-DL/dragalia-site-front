import {GetTranslationFunction} from '../../../../../../../i18n/types';
import {sortAscending, sortDescending} from '../../../../../../../utils/sort';
import {SortOrder, UnitInfoPack} from '../types';


type SortFuncLookup = { [sortBy in SortOrder]: (entryA: UnitInfoPack, entryB: UnitInfoPack) => number }

export const sortFunc: SortFuncLookup = {
  unitId: sortAscending({getComparer: (element) => element.unitInfo.id}),
  published: sortDescending({getComparer: (element) => element.lookupInfo.publishedEpoch}),
  lastModified: sortDescending({getComparer: (element) => element.lookupInfo.modifiedEpoch}),
  viewCount: sortDescending({getComparer: (element) => element.lookupInfo.viewCount}),
};

export const orderName: { [sortBy in SortOrder]: GetTranslationFunction } = {
  unitId: (t) => t.posts.analysis.sort.unitId,
  published: (t) => t.posts.analysis.sort.published,
  lastModified: (t) => t.posts.analysis.sort.lastModified,
  viewCount: (t) => t.posts.analysis.sort.viewCount,
};

import {useSession} from 'next-auth/react';

import {
  KeyPointData,
  KeyPointEntryFromBack,
  KeyPointManageResponse,
  UnitTierNoteEditResponse,
} from '../../../../api-def/api';
import {useI18n} from '../../../../i18n/hook';
import {overrideObject} from '../../../../utils/override';
import {ApiRequestSender} from '../../../../utils/services/api/requestSender';
import {useFetchStateProcessed} from '../../../elements/common/fetch';
import {UnitTierNoteEdit} from '../types';


type TierNoteEditResourceReturn = {
  unitTierNote: UnitTierNoteEdit,
  keyPointEntries: Array<KeyPointEntryFromBack>,
  keyPointLookup: KeyPointData,
  setUnitTierNote: (newNote: UnitTierNoteEdit) => void,
  isFetchingResources: boolean,
};

export const useTierNoteEditResources = (unitId: number): TierNoteEditResourceReturn => {
  const {lang} = useI18n();
  const {data} = useSession();

  const uid = data?.user.id.toString() || '';

  const {
    fetchStatus: unitTierNote,
    fetchFunction: fetchUnitTierNote,
    setFetchStatus: setUnitTierNote,
  } = useFetchStateProcessed<UnitTierNoteEdit, UnitTierNoteEditResponse>(
    {tier: {}, points: []},
    () => ApiRequestSender.getUnitTierNoteManage(uid, lang, unitId),
    'Failed to fetch unit tier note for edit.',
    (response) => response.data || {tier: {}, points: []},
  );
  const {
    fetchStatus: keyPointEntries,
    fetchFunction: fetchKeyPointEntries,
  } = useFetchStateProcessed<Array<KeyPointEntryFromBack>, KeyPointManageResponse>(
    [],
    () => ApiRequestSender.getKeyPointsManage(uid, lang),
    'Failed to fetch unit key point data.',
    (response) => response.points,
  );

  fetchUnitTierNote();
  fetchKeyPointEntries();

  return {
    unitTierNote: unitTierNote.data,
    keyPointEntries: keyPointEntries.data,
    setUnitTierNote: (data) => setUnitTierNote(overrideObject(unitTierNote, {data})),
    keyPointLookup: Object.fromEntries(
      keyPointEntries.data.map((entry) => ([entry.id, entry])),
    ),
    isFetchingResources: unitTierNote.fetching || keyPointEntries.fetching,
  };
};

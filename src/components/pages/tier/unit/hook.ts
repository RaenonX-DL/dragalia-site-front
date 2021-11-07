import React from 'react';

import {UnitTierNote} from '../../../../api-def/api/tier/notes/elements';
import {isFailedResponse} from '../../../../api-def/api/utils';
import {AppReactContext} from '../../../../context/app/main';
import {useI18n} from '../../../../i18n/hook';
import {ApiRequestSender} from '../../../../utils/services/api/requestSender';
import {useFetchState} from '../../../elements/common/fetch';
import {useUnitId} from '../../../elements/gameData/hook';


type UseSingleUnitTierNoteResourcesReturn = {
  unitId: number | undefined,
  isAdmin: boolean,
} & ({
  fetchStatus: 'fetching',
  data: undefined,
} | {
  fetchStatus: 'noUnitId',
  data: undefined,
} | {
  fetchStatus: 'completed',
  data: UnitTierNote | null,
});

export const useSingleUnitTierNoteResources = (): UseSingleUnitTierNoteResourcesReturn => {
  const {lang} = useI18n();
  const context = React.useContext(AppReactContext);

  const unitId = useUnitId();
  const isAdmin = context?.session?.user.isAdmin || false;

  if (unitId === undefined) {
    return {
      fetchStatus: 'noUnitId',
      data: undefined,
      unitId,
      isAdmin,
    };
  }

  const {
    fetchStatus: unitTierNote,
    fetchFunction: fetchTierNote,
  } = useFetchState(
    undefined,
    () => ApiRequestSender.getUnitTierNoteSingle(context?.session?.user.id.toString() || '', lang, unitId),
    `Failed to fetch the unit tier note of #${unitId}.`,
  );

  fetchTierNote();

  if (!unitTierNote.fetched || !unitTierNote.data || isFailedResponse(unitTierNote.data)) {
    return {
      fetchStatus: 'fetching',
      data: undefined,
      unitId,
      isAdmin,
    };
  }

  return {
    fetchStatus: 'completed',
    data: unitTierNote.data.data,
    unitId,
    isAdmin,
  };
};

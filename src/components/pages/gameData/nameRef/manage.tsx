import React from 'react';

import {UnitNameRefManageResponse} from '../../../../api-def/api';
import {useI18n} from '../../../../i18n/hook';
import {ApiRequestSender} from '../../../../utils/services/api/requestSender';
import {useUnitInfo} from '../../../../utils/services/resources/unitInfo/hooks';
import {EntryManagement} from '../../../elements/form/manageEntries';
import {UnitNameRefEntry} from './entry';


export type RefsManagementProps = {
  refs: UnitNameRefManageResponse['refs'],
  uid: string
};

export const UnitNameRefManagement = ({refs, uid}: RefsManagementProps) => {
  const {lang} = useI18n();

  const {unitInfoMap} = useUnitInfo();

  return (
    <EntryManagement
      data={refs}
      getElementUniqueIdentifier={(entry) => entry.name}
      getSubmitPromise={(updatedRefs) => ApiRequestSender.updateUnitNameRefs(uid, lang, updatedRefs)}
      isEntryValid={(entry) => !!unitInfoMap.get(entry.unitId) && !!entry.name}
      generateNewElement={() => ({unitId: 0, name: ''})}
      renderEntries={(element, onChange, _, counter) => (
        <UnitNameRefEntry
          entry={element} onChanged={onChange} unitInfoMap={unitInfoMap}
          isNameInvalid={(counter.get(element.name) || 0) > 1}
        />
      )}
      elemRenderCount={30}
      vertical
    />
  );
};

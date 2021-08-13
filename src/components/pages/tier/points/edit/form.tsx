import React from 'react';

import {useI18n} from '../../../../../i18n/hook';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {EntryManagement} from '../../../../elements/form/manageEntries';
import {KeyPointEntryManage} from '../../mock';
import {KeyPointEntry} from './entry';

type Props = {
  points: Array<KeyPointEntryManage>,
  uid: string,
}

export const KeyPointsManagement = ({points, uid}: Props) => {
  const {lang} = useI18n();

  return (
    <EntryManagement
      data={points}
      uid={uid}
      getElementUniqueIdentifier={(point) => point.description}
      getSubmitPromise={(updatedPoints) => ApiRequestSender.updateKeyPointContent(uid, lang, updatedPoints)}
      isEntryValid={(entry) => !!entry.description}
      generateNewElement={() => ({
        type: 'strength',
        description: '',
      } as KeyPointEntryManage)}
      renderEntries={(element, onChange, _, counter) => (
        <KeyPointEntry
          entry={element} onChanged={onChange}
          isDescriptionInvalid={(counter.get(element.description) || 0) > 1}
        />
      )}
    />
  );
};

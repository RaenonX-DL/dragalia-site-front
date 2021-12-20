import React from 'react';

import {KeyPointEntryUpdate} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {EntryManagement} from '../../../../elements/form/manageEntries';
import {KeyPointEntry} from './entry';


type Props = {
  points: Array<KeyPointEntryUpdate>,
  uid: string,
};

export const KeyPointsManagement = ({points, uid}: Props) => {
  const {lang} = useI18n();

  return (
    <EntryManagement
      data={points}
      getElementUniqueIdentifier={(point) => point.description}
      getSubmitPromise={(updatedPoints) => ApiRequestSender.updateKeyPointContent(uid, lang, updatedPoints)}
      isEntryValid={(entry) => !!entry.description}
      generateNewElement={() => ({
        type: 'strength',
        description: '',
      } as KeyPointEntryUpdate)}
      renderEntries={(element, onChange, _, counter) => (
        <KeyPointEntry
          entry={element} onChanged={onChange}
          isDescriptionInvalid={(counter.get(element.description) || 0) > 1}
        />
      )}
    />
  );
};

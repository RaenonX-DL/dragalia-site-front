import React from 'react';
import {Alert} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {PAGE_ATK_SKILL_MAX_ENTRIES} from '../../../constants/config';


type TruncatedEntryProps = {
  displayed: number,
  returned: number,
}


const TruncatedWarningEntry = ({displayed, returned}: TruncatedEntryProps) => {
  const {t} = useTranslation();

  return (
    <Alert variant="warning" className="rounded bg-black-32 p-2 mb-2">
      {t('message.warning.truncated', {displayed, returned})}
    </Alert>
  );
};


/**
 * Check the length of the entries.
 *
 * If it goes beyond a certain limit, splice the entries and return a warning entry to be attached.
 * Otherwise, return null.
 *
 * @param {Array<React.ReactElement>} entries element entry array to be checked
 * @return {React.ReactElement?} a warning entry if the length is too long, null otherwise
 */
export const overLengthWarningCheck = (entries: Array<any>) => {
  if (entries.length > PAGE_ATK_SKILL_MAX_ENTRIES) {
    const originalLength = entries.length;
    entries.splice(PAGE_ATK_SKILL_MAX_ENTRIES);
    return <TruncatedWarningEntry displayed={PAGE_ATK_SKILL_MAX_ENTRIES} returned={originalLength} key={-1}/>;
  }

  return null;
};

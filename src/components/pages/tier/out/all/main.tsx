import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import {OverLengthWarning} from '../../../../elements/gameData/warnings/overLength';
import {MaxEntriesToDisplay} from '../../const';
import {PropsUseEntryPack, PropsUseKeyPointData} from '../../types';
import {TierListEntry} from './entry';


type Props = PropsUseKeyPointData & PropsUseEntryPack

export const TierListOutputShowAll = ({entryPackHasTierNote, entryPackNoTierNote, keyPointsData}: Props) => {
  const entryPackMerged = [...entryPackHasTierNote, ...entryPackNoTierNote];
  const entryPackCount = entryPackMerged.length;
  const isResultOverLength = entryPackCount > MaxEntriesToDisplay;
  if (isResultOverLength) {
    entryPackMerged.splice(MaxEntriesToDisplay);
  }

  return (
    <>
      {isResultOverLength && <OverLengthWarning displayed={MaxEntriesToDisplay} returned={entryPackCount}/>}
      <Form.Row>
        {entryPackMerged.map(({unitInfo, tierNote}) => (
          <Col key={unitInfo.id} lg={4}>
            <TierListEntry tierNote={tierNote} unitInfo={unitInfo} keyPointsData={keyPointsData}/>
          </Col>
        ))}
      </Form.Row>
    </>
  );
};

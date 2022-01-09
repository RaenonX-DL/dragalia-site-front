import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PropsUseEntryPack, PropsUseKeyPointData} from '../../types';
import {TierListEntry} from './entry';


type Props = PropsUseKeyPointData & PropsUseEntryPack;

export const TierListOutputShowAll = ({entryPackHasTierNote, entryPackNoTierNote, keyPointsData}: Props) => {
  const entryPackMerged = [...entryPackHasTierNote, ...entryPackNoTierNote];

  return (
    <Row className="g-3">
      {entryPackMerged.map(({unitInfo, tierNote}) => (
        <Col xl={6} key={unitInfo.id}>
          <TierListEntry tierNote={tierNote} unitInfo={unitInfo} keyPointsData={keyPointsData}/>
        </Col>
      ))}
    </Row>
  );
};

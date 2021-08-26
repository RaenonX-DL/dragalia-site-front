import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import {PropsUseEntryPack, PropsUseKeyPointData} from '../../types';
import {TierListEntry} from './entry';


type Props = PropsUseKeyPointData & PropsUseEntryPack

export const TierListOutputShowAll = ({entryPackHasTierNote, entryPackNoTierNote, keyPointsData}: Props) => {
  const entryPackMerged = [...entryPackHasTierNote, ...entryPackNoTierNote];

  return (
    <Form.Row>
      {entryPackMerged.map(({unitInfo, tierNote}) => (
        <Col xl={6} key={unitInfo.id}>
          <TierListEntry tierNote={tierNote} unitInfo={unitInfo} keyPointsData={keyPointsData}/>
        </Col>
      ))}
    </Form.Row>
  );
};

import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import {EntryPackOutput, PropsUseKeyPointData} from '../../types';
import {TierListEntry} from './entry';


type Props = PropsUseKeyPointData & {
  unitInfoList: Array<EntryPackOutput>,
}

export const TierListOutputShowAll = ({unitInfoList, keyPointsData}: Props) => {
  return (
    <Form.Row>
      {unitInfoList.map(({unitInfo, tierNote}) => (
        <Col key={unitInfo.id} lg={4}>
          <TierListEntry tierNote={tierNote} unitInfo={unitInfo} keyPointsData={keyPointsData}/>
        </Col>
      ))}
    </Form.Row>
  );
};

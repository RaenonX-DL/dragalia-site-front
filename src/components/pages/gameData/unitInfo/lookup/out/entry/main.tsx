import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {UnitIcon} from '../../../../../../elements/gameData/unit/icon';
import {EntryWithAnalysis} from './entryHasAnalysis';
import {EntryNoAnalysis} from './entryNoAnalysis';
import {EntryProps} from './types';


export const UnitInfoEntry = (props: EntryProps) => {
  const {unitInfo, analysisMeta} = props;

  return (
    <Row noGutters className="section">
      <Col xs="auto" className="mr-2">
        <UnitIcon unitInfo={unitInfo} className="ml-1" style={{height: '4rem'}}/>
      </Col>
      <Col>
        {
          analysisMeta ?
            <EntryWithAnalysis analysisMeta={analysisMeta} {...props}/> :
            <EntryNoAnalysis {...props}/>
        }
      </Col>
    </Row>
  );
};

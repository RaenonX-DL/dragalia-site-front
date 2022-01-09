import React from 'react';

import Col from 'react-bootstrap/Col';

import {RowNoGutter} from '../../../../../../elements/common/grid/row';
import {UnitIcon} from '../../../../../../elements/gameData/unit/icon';
import {EntryWithAnalysis} from './entryHasAnalysis';
import {EntryNoAnalysis} from './entryNoAnalysis';
import {EntryProps} from './types';


export const UnitInfoEntry = (props: EntryProps) => {
  const {unitInfo, analysisMeta} = props;

  return (
    <RowNoGutter className="section">
      {
        !props.iconOnly &&
        <Col xs="auto" className="me-2">
          <UnitIcon unitInfo={unitInfo} className="ms-1" style={{height: '4rem'}}/>
        </Col>
      }
      <Col>
        {
          analysisMeta ?
            <EntryWithAnalysis analysisMeta={analysisMeta} {...props}/> :
            <EntryNoAnalysis {...props}/>
        }
      </Col>
    </RowNoGutter>
  );
};

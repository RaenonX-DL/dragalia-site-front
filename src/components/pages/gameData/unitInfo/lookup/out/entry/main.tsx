import React from 'react';

import Col from 'react-bootstrap/Col';

import {RowNoGutter} from '../../../../../../elements/common/grid/row';
import {UnitIconClickable} from '../../../../../../elements/gameData/unit/iconClickable';
import styles from '../../main.module.css';
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
          <UnitIconClickable unit={unitInfo} className={styles['unit-icon']}/>
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

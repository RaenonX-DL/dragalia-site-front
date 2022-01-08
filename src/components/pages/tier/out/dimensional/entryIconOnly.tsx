import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {AppReactContext} from '../../../../../context/app/main';
import {UnitIcon} from '../../../../elements/gameData/unit/icon';
import {IconCompDependent} from '../../icons';
import styles from '../../main.module.css';
import {EntryPackOutput, PropsDimensionalCommon, PropsUseKeyPointData} from '../../types';
import {TierNoteEditIcon} from '../elements/editIcon';
import {TierNoteIcon} from '../elements/noteIcon';
import {TierNotePointIcon} from '../elements/pointIcon';


type Props = PropsUseKeyPointData & Pick<PropsDimensionalCommon, 'dimension'> & {
  entryPack: EntryPackOutput,
};

export const TierListEntryIconOnly = ({entryPack, dimension, keyPointsData}: Props) => {
  const context = React.useContext(AppReactContext);

  const {unitInfo, tierNote} = entryPack;
  const noteOfDimension = tierNote?.tier[dimension];
  const pointIds = tierNote?.points || [];

  return (
    <div className="section mb-2">
      <Row className="text-center">
        <Col>
          <UnitIcon unitInfo={unitInfo} style={{width: '5rem'}}/>
        </Col>
      </Row>
      <Row>
        <Col>
          {
            noteOfDimension &&
            <div>
              <TierNoteIcon tierNote={noteOfDimension} iconClassName={styles['tier-note-dimension']}/>
              {
                pointIds.length > 0 &&
                <span className={styles['dimension-point-icon']}>
                  <TierNotePointIcon pointIds={pointIds} keyPointsData={keyPointsData}/>
                </span>
              }
              {noteOfDimension.isCompDependent && <IconCompDependent/>}
            </div>
          }
        </Col>
        <Col xs="auto">
          {context?.session?.user.isAdmin && <TierNoteEditIcon unitId={unitInfo.id}/>}
        </Col>
      </Row>
    </div>
  );
};

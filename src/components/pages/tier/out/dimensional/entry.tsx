import React from 'react';

import {useSession} from 'next-auth/react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useI18n} from '../../../../../i18n/hook';
import {TimeAgo} from '../../../../../utils/timeago';
import {UnitIcon} from '../../../../elements/gameData/unit/icon';
import {UnitLink} from '../../../../elements/gameData/unit/link';
import {IconCompDependent} from '../../icons';
import {EntryPackOutput, PropsDimensionalCommon, PropsUseKeyPointData} from '../../types';
import {TierNoteEditIcon} from '../elements/editIcon';
import {TierNoteIcon} from '../elements/noteIcon';
import {TierNotePointIcon} from '../elements/pointIcon';
import styles from './main.module.css';


type Props = PropsUseKeyPointData & Pick<PropsDimensionalCommon, 'dimension'> & {
  entryPack: EntryPackOutput,
  iconOnly: boolean,
};

export const TierListEntry = ({entryPack, dimension, keyPointsData, iconOnly}: Props) => {
  const {lang} = useI18n();
  const {data} = useSession();

  const {unitInfo, tierNote} = entryPack;
  const noteOfDimension = tierNote?.tier[dimension];
  const pointIds = tierNote?.points || [];

  return (
    <div className="section">
      {
        !iconOnly &&
        <Row className="text-center mb-1">
          <Col>
            <UnitLink unit={{id: unitInfo.id, name: unitInfo.name[lang]}}/>
          </Col>
        </Row>
      }
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
        <Col xs="auto" className="ps-0">
          {data?.user.isAdmin && <TierNoteEditIcon unitId={unitInfo.id}/>}
        </Col>
      </Row>
      {
        tierNote &&
        <Row>
          <Col className="text-muted text-end">
            <small>
              <TimeAgo epoch={tierNote.lastUpdateEpoch}/>
            </small>
          </Col>
        </Row>
      }
    </div>
  );
};

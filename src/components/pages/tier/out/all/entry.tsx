import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {Dimension, DimensionKey, KeyPointData, UnitTierNote} from '../../../../../api-def/api';
import {UnitInfoData} from '../../../../../api-def/resources';
import {useI18n} from '../../../../../i18n/hook';
import {TimeAgo} from '../../../../../utils/timeago';
import {UnitIcon} from '../../../../elements/gameData/unit/icon';
import {UnitLink} from '../../../../elements/gameData/unit/link';
import styles from '../../main.module.css';
import {TierNoteEditIcon} from '../elements/editIcon';
import {TierNote} from '../elements/note';
import {TierNotePointIcon} from '../elements/pointIcon';


type Props = {
  tierNote: UnitTierNote | undefined,
  keyPointsData: KeyPointData,
  unitInfo: UnitInfoData,
}

export const TierListEntry = ({tierNote, keyPointsData, unitInfo}: Props) => {
  const {t, lang} = useI18n();

  return (
    <div className="bg-black-32 rounded p-2 mb-2">
      <Row noGutters className="text-center align-items-center bg-img-wrap">
        <UnitIcon unitInfo={unitInfo} className={`bg-img ${styles.unitIcon}`}/>
        <Col>
          <Row noGutters className="bg-img-wrap">
            <Col md={6} className="text-left">
              {
                tierNote && tierNote.points.length > 0 &&
                <><TierNotePointIcon pointIds={tierNote.points} keyPointsData={keyPointsData}/>&nbsp;</>
              }
              <UnitLink unit={{id: unitInfo.id, name: unitInfo.name[lang]}}/>
            </Col>
            <Col md={6} className="text-right">
              <small>
                {
                  tierNote ?
                    <>
                      {t((t) => t.misc.timestamp.lastUpdated)}&nbsp;
                      <TimeAgo epoch={tierNote.lastUpdateEpoch}/>
                    </> :
                    '-'
                }
              </small>
              <TierNoteEditIcon unitId={unitInfo.id}/>
            </Col>
          </Row>
          <hr className="my-2"/>
          <Row noGutters className="text-center">
            {Object.keys(Dimension).map((item) => {
              const dimension = item as DimensionKey;

              return (
                <Col xs={4} md key={item}>
                  <TierNote
                    dimension={dimension}
                    tierNote={tierNote ? tierNote.tier[dimension] : undefined}
                  />
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

import React from 'react';

import Col from 'react-bootstrap/Col';

import {Dimension, DimensionKey, KeyPointData, UnitTierNote} from '../../../../../api-def/api';
import {UnitInfoData} from '../../../../../api-def/resources';
import {useI18n} from '../../../../../i18n/hook';
import {unitInfoToClickableProps} from '../../../../../utils/services/resources/unitInfo/utils';
import {TimeAgo} from '../../../../../utils/timeago';
import {RowNoGutter} from '../../../../elements/common/grid/row';
import {UnitIcon} from '../../../../elements/gameData/unit/icon';
import {UnitIconClickable} from '../../../../elements/gameData/unit/iconClickable';
import {UnitLink} from '../../../../elements/gameData/unit/link';
import mainStyles from '../../main.module.css';
import {TierNoteEditIcon} from '../elements/editIcon';
import {TierNote} from '../elements/note';
import {TierNotePointIcon} from '../elements/pointIcon';
import styles from './main.module.css';


type Props = {
  tierNote: UnitTierNote | undefined,
  keyPointsData: KeyPointData,
  unitInfo: UnitInfoData,
};

export const TierListEntry = ({tierNote, keyPointsData, unitInfo}: Props) => {
  const {t, lang} = useI18n();

  return (
    <div className="section">
      <RowNoGutter className={`text-center align-items-center ${styles['bg-img-wrap']}`}>
        <UnitIcon unitInfo={unitInfo} className={`bg-img ${mainStyles['unit-icon-bg']}`}/>
        <Col>
          <RowNoGutter>
            <Col md className="text-start">
              {
                tierNote && tierNote.points.length > 0 &&
                <><TierNotePointIcon pointIds={tierNote.points} keyPointsData={keyPointsData}/>&nbsp;</>
              }
              <UnitIconClickable
                unit={unitInfoToClickableProps(unitInfo, lang)}
                className={mainStyles['unit-icon-name']}
              />
              <UnitLink unit={{id: unitInfo.id, name: unitInfo.name[lang]}}/>
            </Col>
            <Col md="auto" className="text-end">
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
          </RowNoGutter>
          <hr className="my-2"/>
          <RowNoGutter className="text-center">
            {Object.keys(Dimension).map((item) => {
              const dimension = item as DimensionKey;

              return (
                <Col xs={4} lg={3} key={item} className={styles['entry-show-all']}>
                  <TierNote
                    dimension={dimension}
                    tierNote={tierNote ? tierNote.tier[dimension] : undefined}
                  />
                </Col>
              );
            })}
          </RowNoGutter>
        </Col>
      </RowNoGutter>
    </div>
  );
};

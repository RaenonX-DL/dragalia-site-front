import React from 'react';

import Col from 'react-bootstrap/Col';

import {AppReactContext} from '../../../../../context/app/main';
import {useI18n} from '../../../../../i18n/hook';
import {RowNoGutter} from '../../../../elements/common/grid/row';
import {UnitIcon} from '../../../../elements/gameData/unit/icon';
import {UnitLink} from '../../../../elements/gameData/unit/link';
import {IconCompDependent} from '../../icons';
import styles from '../../main.module.css';
import {EntryPackOutput, PropsDimensionalCommon, PropsUseKeyPointData} from '../../types';
import {TierNoteEditIcon} from '../elements/editIcon';
import {TierNoteIcon} from '../elements/noteIcon';
import {TierNotePointIcon} from '../elements/pointIcon';


type Props = PropsUseKeyPointData & Pick<PropsDimensionalCommon, 'dimension'> & {
  entryPack: EntryPackOutput,
};

export const TierListEntry = ({entryPack, dimension, keyPointsData}: Props) => {
  const {lang} = useI18n();
  const context = React.useContext(AppReactContext);

  const {unitInfo, tierNote} = entryPack;
  const noteOfDimension = tierNote?.tier[dimension];
  const pointIds = tierNote?.points || [];

  return (
    <>
      <RowNoGutter className="section mb-2">
        <Col xs="auto" className="mr-2">
          <UnitIcon unitInfo={unitInfo} style={{height: '4rem'}}/>
        </Col>
        <Col>
          <div className="text-right">
            <span className="float-left"><UnitLink unit={{id: unitInfo.id, name: unitInfo.name[lang]}}/></span>
            {context?.session?.user.isAdmin && <TierNoteEditIcon unitId={unitInfo.id}/>}
          </div>
          {
            noteOfDimension &&
            <div className={styles['dimension-entry-bar']}>
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
      </RowNoGutter>
    </>
  );
};

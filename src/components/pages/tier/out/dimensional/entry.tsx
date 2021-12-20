import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {AppReactContext} from '../../../../../context/app/main';
import {useI18n} from '../../../../../i18n/hook';
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
      <Row noGutters className="section mb-2">
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
            <div className={styles.dimensionEntryBar}>
              <TierNoteIcon tierNote={noteOfDimension} iconClassName={styles.tierNoteDimension}/>
              {
                pointIds.length > 0 &&
                <span className={styles.dimensionPointIcon}>
                  <TierNotePointIcon pointIds={pointIds} keyPointsData={keyPointsData}/>
                </span>
              }
              {noteOfDimension.isCompDependent && <IconCompDependent/>}
            </div>
          }
        </Col>
      </Row>
    </>
  );
};

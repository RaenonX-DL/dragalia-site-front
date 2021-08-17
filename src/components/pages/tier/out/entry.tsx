import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {Dimension, DimensionKey, KeyPointData, UnitTierNote} from '../../../../api-def/api';
import {UnitInfoData} from '../../../../api-def/resources';
import {useI18n} from '../../../../i18n/hook';
import {TimeAgo} from '../../../../utils/timeago';
import {IconRadar} from '../../../elements/common/icons';
import {ModalFixedContent} from '../../../elements/common/modal/fix';
import {ModalStateFix} from '../../../elements/common/modal/types';
import {UnitIcon} from '../../../elements/gameData/unit/icon';
import {UnitLink} from '../../../elements/gameData/unit/link';
import styles from '../main.module.css';
import {TierNote} from './note';
import {TierKeyPoints} from './points';


type Props = {
  tierNote: UnitTierNote | undefined,
  keyPointsData: KeyPointData,
  unitInfo: UnitInfoData,
}

export const TierListEntry = ({tierNote, keyPointsData, unitInfo}: Props) => {
  const {t, lang} = useI18n();
  const [modalState, setModalState] = React.useState<ModalStateFix>({
    show: false,
    title: t((t) => t.game.unitTier.points.title),
  });

  return (
    <div className="bg-black-32 rounded p-2 mb-2">
      <ModalFixedContent state={modalState} setState={setModalState}>
        <TierKeyPoints keyPointsIds={tierNote?.points || []} keyPointsData={keyPointsData}/>
      </ModalFixedContent>
      <div className="mb-2 text-center">
        <UnitLink unit={{id: unitInfo.id, name: unitInfo.name[lang]}} className={styles.unitName}/>
      </div>
      <hr className="m-2"/>
      <Row noGutters className="align-items-center bg-img-wrap">
        <UnitIcon unitInfo={unitInfo} className={`bg-img ${styles.unitIcon}`}/>
        <Col>
          <Row noGutters className="text-center">
            {Object.keys(Dimension).map((item) => {
              const dimension = item as DimensionKey;

              return (
                <Col key={item} xs={4}>
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
      <Row>
        {
          tierNote && tierNote.points && tierNote.points.length > 0 &&
          <Col xs="auto">
            <a className={styles.unitPoint} onClick={() => setModalState({...modalState, show: true})}>
              <IconRadar/>
            </a>
          </Col>
        }
        <Col className="text-right">
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
        </Col>
      </Row>
    </div>
  );
};

import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {Dimension, DimensionKey, KeyPointData, UnitTierNote} from '../../../../../api-def/api';
import {UnitInfoData} from '../../../../../api-def/resources';
import {UnitPath} from '../../../../../const/path/definitions';
import {AppReactContext} from '../../../../../context/app/main';
import {useI18n} from '../../../../../i18n/hook';
import {makeUnitUrl} from '../../../../../utils/path/make';
import {TimeAgo} from '../../../../../utils/timeago';
import {IconEdit, IconRadar} from '../../../../elements/common/icons';
import {ModalFixedContent} from '../../../../elements/common/modal/fix';
import {ModalStateFix} from '../../../../elements/common/modal/types';
import {UnitIcon} from '../../../../elements/gameData/unit/icon';
import {UnitLink} from '../../../../elements/gameData/unit/link';
import styles from '../../main.module.css';
import {TierNote} from '../elements/note';
import {TierKeyPoints} from '../elements/points';


type Props = {
  tierNote: UnitTierNote | undefined,
  keyPointsData: KeyPointData,
  unitInfo: UnitInfoData,
}

export const TierListEntry = ({tierNote, keyPointsData, unitInfo}: Props) => {
  const {t, lang} = useI18n();
  const context = React.useContext(AppReactContext);
  const [modalState, setModalState] = React.useState<ModalStateFix>({
    show: false,
    title: t((t) => t.game.unitTier.points.title),
  });

  return (
    <div className="bg-black-32 rounded p-2 mb-2">
      <ModalFixedContent state={modalState} setState={setModalState}>
        <TierKeyPoints keyPointsIds={tierNote?.points || []} keyPointsData={keyPointsData}/>
      </ModalFixedContent>
      <Row className="mb-2 text-center align-items-center">
        <Col>
          <UnitLink unit={{id: unitInfo.id, name: unitInfo.name[lang]}} className={styles.unitName}/>
        </Col>
        {
          context?.session?.user.isAdmin &&
          <Col xs="auto">
            <a className={styles.editIcon} href={makeUnitUrl(UnitPath.UNIT_TIER_EDIT, {id: unitInfo.id, lang})}>
              <IconEdit/>
            </a>
          </Col>
        }
      </Row>
      <hr className="my-2"/>
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
          tierNote && tierNote.points.length > 0 &&
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

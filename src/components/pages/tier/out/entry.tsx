import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {UnitInfoData} from '../../../../api-def/resources';
import {useI18n} from '../../../../i18n/hook';
import {TimeAgo} from '../../../../utils/timeago';
import {UnitIcon} from '../../../elements/gameData/unit/icon';
import {UnitLink} from '../../../elements/gameData/unit/link';
import styles from '../main.module.css';
import {Dimension, DimensionKey, UnitTierNote} from '../mock';
import {TierNote} from './note';


type Props = {
  entry: UnitTierNote | undefined,
  unitInfo: UnitInfoData,
}

export const TierListEntry = ({entry, unitInfo}: Props) => {
  const {t, lang} = useI18n();

  return (
    <div className="bg-black-32 rounded p-2 mb-2">
      <div className="mb-2 text-center">
        <UnitLink unit={{id: unitInfo.id, name: unitInfo.name[lang]}} className={styles.unitName}/>
      </div>
      <hr className="m-2"/>
      <Row noGutters className="align-items-center bg-img-wrap">
        <UnitIcon unitInfo={unitInfo} className={`bg-img ${styles.unitIcon}`}/>
        <Col>
          <Row noGutters className="text-center">
            {Object.keys(Dimension).map((item, idx) => {
              const dimension = item as DimensionKey;
              const tierNote = entry ? entry.tier[dimension] : undefined;

              return (
                <Col key={idx} xs={4}>
                  <TierNote dimension={dimension} tierNote={tierNote}/>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
      <Row>
        <Col className="text-right">
          <small>
            {
              entry ?
                <>
                  {t((t) => t.misc.timestamp.lastUpdated)}&nbsp;
                  <TimeAgo epoch={entry.lastUpdateEpoch}/>
                </> :
                '-'
            }
          </small>
        </Col>
      </Row>
    </div>
  );
};

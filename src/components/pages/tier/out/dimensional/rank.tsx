import React from 'react';

import Col from 'react-bootstrap/Col';

import {useI18n} from '../../../../../i18n/hook';
import {RowTight} from '../../../../elements/common/grid/row';
import {EntryPackOutput, PropsDimensionalCommon, PropsUseKeyPointData} from '../../types';
import {TierListEntry} from './entry';
import styles from './main.module.css';


type Props = PropsUseKeyPointData & PropsDimensionalCommon & {
  entryPacks: Array<EntryPackOutput>,
};

export const TierListOutputRank = ({dimension, entryPacks, keyPointsData, iconOnly}: Props) => {
  const {t} = useI18n();

  return (
    <RowTight>
      {
        entryPacks.length > 0 ?
          entryPacks.map((entryPack) => (
            <Col key={entryPack.unitInfo.id} className={styles.entry} >
              <TierListEntry
                dimension={dimension}
                entryPack={entryPack}
                keyPointsData={keyPointsData}
                iconOnly={iconOnly}
              />
            </Col>
          )) :
          <Col className="text-danger">
            <div className="section">
              {t((t) => t.game.unitTier.alert.noUnitInRank)}
            </div>
          </Col>
      }
    </RowTight>
  );
};

import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import {DimensionKey} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {EntryPackOutput, PropsUseKeyPointData} from '../../types';
import {TierListEntry} from './entry';


type Props = PropsUseKeyPointData & {
  dimension: DimensionKey,
  entryPacks: Array<EntryPackOutput>,
}

export const TierListOutputRank = ({dimension, entryPacks, keyPointsData}: Props) => {
  const {t} = useI18n();

  return (
    <Form.Row>
      {
        entryPacks.length > 0 ?
          entryPacks.map((entryPack) => (
            <Col md={6} lg={4} key={entryPack.unitInfo.id}>
              <TierListEntry dimension={dimension} entryPack={entryPack} keyPointsData={keyPointsData}/>
            </Col>
          )) :
          <Col className="mb-2 text-danger">
            <div className="section">
              {t((t) => t.game.unitTier.alert.noUnitInRank)}
            </div>
          </Col>
      }
    </Form.Row>
  );
};

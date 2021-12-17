import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import {useI18n} from '../../../../../i18n/hook';
import {EntryPackOutput, PropsDimensionalCommon, PropsUseKeyPointData} from '../../types';
import {TierListEntry} from './entry';
import {TierListEntryIconOnly} from './entryIconOnly';


type Props = PropsUseKeyPointData & PropsDimensionalCommon & {
  entryPacks: Array<EntryPackOutput>,
};

export const TierListOutputRank = ({dimension, entryPacks, keyPointsData, iconOnly}: Props) => {
  const {t} = useI18n();

  return (
    <Form.Row>
      {
        entryPacks.length > 0 ?
          entryPacks.map((entryPack) => (
            <Col
              key={entryPack.unitInfo.id}
              xs={iconOnly ? 4 : undefined}
              md={iconOnly ? undefined : 6}
              lg={iconOnly ? 2 : 4}
            >
              {
                iconOnly ?
                  <TierListEntryIconOnly
                    dimension={dimension}
                    entryPack={entryPack}
                    keyPointsData={keyPointsData}
                  /> :
                  <TierListEntry
                    dimension={dimension}
                    entryPack={entryPack}
                    keyPointsData={keyPointsData}
                  />
              }
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

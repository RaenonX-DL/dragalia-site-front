import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {UnitTierData} from '../../../../api-def/api';
import {useI18n} from '../../../../i18n/hook';
import {AdsTierResultsEnd} from '../../../elements/common/ads/main';
import {UnitSearchOutputProps} from '../../../elements/gameData/unit/searcher/types';
import {sortFunc} from '../const';
import {IconCompDependent} from '../icons';
import {InputData, PropsUseKeyPointData, SortOrder} from '../types';
import {TierListOutputShowAll} from './all/main';
import {TierListOutputDimensional} from './dimensional/main';


type Props = PropsUseKeyPointData & UnitSearchOutputProps<SortOrder, InputData> & {
  tierData: UnitTierData,
}

export const TierListOutput = ({inputData, tierData, processedUnitInfo, keyPointsData}: Props) => {
  const {t} = useI18n();

  const entryPackHasTierNote = processedUnitInfo
    .filter((info) => info.id in tierData)
    .map((info) => ({unitInfo: info, tierNote: tierData[info.id]}))
    .sort(sortFunc[inputData.sortBy]);
  const entryPackNoTierNote = processedUnitInfo
    .filter((info) => !(info.id in tierData))
    .map((info) => ({unitInfo: info, tierNote: undefined}));

  return (
    <>
      <Alert variant="info" className="mb-2">{t((t) => t.game.unitTier.tips.main)}</Alert>
      <Row className="text-right mb-2">
        <Col>
          <IconCompDependent/>&nbsp;=&nbsp;{t((t) => t.game.unitTier.tips.compIcon)}
        </Col>
      </Row>
      {
        inputData.display === 'all' ?
          <TierListOutputShowAll
            entryPackHasTierNote={entryPackHasTierNote}
            entryPackNoTierNote={entryPackNoTierNote}
            keyPointsData={keyPointsData}
          /> :
          <TierListOutputDimensional
            dimension={inputData.display}
            entryPackHasTierNote={entryPackHasTierNote}
            entryPackNoTierNote={entryPackNoTierNote}
            keyPointsData={keyPointsData}
          />
      }
      {(entryPackHasTierNote.length || entryPackNoTierNote.length) && <AdsTierResultsEnd/>}
    </>
  );
};

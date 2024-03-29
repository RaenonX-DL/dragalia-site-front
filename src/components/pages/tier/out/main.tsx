import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {UnitTierData} from '../../../../api-def/api';
import {useI18n} from '../../../../i18n/hook';
import {AdsTierResultsEnd} from '../../../elements/common/ads/main';
import {UnitSearchOutputProps} from '../../../elements/gameData/unit/searcher/types';
import {IconCompDependent} from '../icons';
import {InputData, PropsUseKeyPointData, SortOrder} from '../types';
import {TierListOutputShowAll} from './all/main';
import {TierListOutputDimensional} from './dimensional/main';


type Props = PropsUseKeyPointData & UnitSearchOutputProps<SortOrder, InputData> & {
  tierData: UnitTierData,
};

export const TierListOutput = ({inputData, tierData, prioritizedUnitInfo, otherUnitInfo, keyPointsData}: Props) => {
  const {t} = useI18n();

  const {display} = inputData;

  const entryPackHasTierNote = prioritizedUnitInfo
    .map((info) => ({unitInfo: info, tierNote: tierData[info.id]}));
  const entryPackNoTierNote = otherUnitInfo
    .map((info) => ({unitInfo: info, tierNote: undefined}));

  return (
    <>
      <Alert variant="info" className="mb-2">
        {t((t) => t.game.unitTier.tips.main)}
      </Alert>
      {
        (display === 'all' || display === 'kaleidoscape') &&
        <Alert variant="warning" className="mb-2">
          {t((t) => t.game.unitTier.tips.kaleidoscape)}
        </Alert>
      }
      <Row className="text-end mb-2">
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
            iconOnly={inputData.iconOnly}
          />
      }
      <div className="mt-3"/>
      {
        (entryPackHasTierNote.length > 0 || entryPackNoTierNote.length > 0) ?
          <AdsTierResultsEnd/> :
          <Alert variant="danger">
            {t((t) => t.misc.noResult)}
          </Alert>
      }
    </>
  );
};

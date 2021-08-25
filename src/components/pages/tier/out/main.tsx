import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {UnitTierData} from '../../../../api-def/api';
import {useI18n} from '../../../../i18n/hook';
import {scrollRefToTop} from '../../../../utils/scroll';
import {useUnitData, useUnitInfo} from '../../../../utils/services/resources/unitInfo/hooks';
import {AdsTierResultsEnd} from '../../../elements/common/ads/main';
import {getFilteredUnitInfo} from '../../../elements/gameData/unit/filter/utils';
import {sortFunc} from '../const';
import {IconCompDependent} from '../icons';
import {InputData, PropsUseKeyPointData} from '../types';
import {TierListOutputShowAll} from './all/main';
import {TierListOutputDimensional} from './dimensional/main';


type Props = PropsUseKeyPointData & {
  inputData: InputData | undefined,
  tierData: UnitTierData,
}

export const TierListOutput = ({inputData, tierData, keyPointsData}: Props) => {
  const {t} = useI18n();
  const {charaInfo, dragonInfo} = useUnitInfo();
  const {nameRef} = useUnitData();

  const elemRef = React.useRef<HTMLDivElement>(null);

  const unitInfoFiltered = getFilteredUnitInfo(inputData, charaInfo, dragonInfo, nameRef);

  // Scroll after input data has changed
  React.useEffect(() => {
    scrollRefToTop(elemRef);
  }, [inputData]);

  if (!inputData) {
    return <></>;
  }

  const entryPackHasTierNote = unitInfoFiltered
    .filter((info) => info.id in tierData)
    .map((info) => ({unitInfo: info, tierNote: tierData[info.id]}))
    .sort(sortFunc[inputData.sortBy]);
  const entryPackNoTierNote = unitInfoFiltered
    .filter((info) => !(info.id in tierData))
    .map((info) => ({unitInfo: info, tierNote: undefined}));

  return (
    <div ref={elemRef}>
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
    </div>
  );
};

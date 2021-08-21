import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {UnitTierData} from '../../../../api-def/api';
import {useI18n} from '../../../../i18n/hook';
import {scrollRefToTop} from '../../../../utils/scroll';
import {useUnitInfo} from '../../../../utils/services/resources/unitInfo/hooks';
import {getFilteredUnitInfo} from '../../../elements/gameData/unit/filter/utils';
import {OverLengthWarning} from '../../../elements/gameData/warnings/overLength';
import {MaxEntriesToDisplay, sortFunc} from '../const';
import {IconCompDependent} from '../icons';
import {InputData, PropsUseKeyPointData} from '../types';
import {TierListOutputShowAll} from './all/main';


type Props = PropsUseKeyPointData & {
  inputData: InputData | undefined,
  tierData: UnitTierData,
}

export const TierListOutput = ({inputData, tierData, keyPointsData}: Props) => {
  const {t} = useI18n();
  const {charaInfo, dragonInfo} = useUnitInfo();

  const elemRef = React.useRef<HTMLDivElement>(null);

  const unitInfoFiltered = getFilteredUnitInfo(inputData, charaInfo, dragonInfo);

  // Scroll after input data has changed
  React.useEffect(() => {
    scrollRefToTop(elemRef);
  }, [inputData]);

  if (!inputData) {
    return <></>;
  }

  const unitInfoHasTierData = unitInfoFiltered
    .filter((info) => info.id in tierData)
    .map((info) => ({unitInfo: info, tierNote: tierData[info.id]}))
    .sort(sortFunc[inputData.sortBy]);
  const unitInfoNoTierData = unitInfoFiltered
    .filter((info) => !(info.id in tierData))
    .map((info) => ({unitInfo: info, tierNote: undefined}));

  const unitInfoList = [...unitInfoHasTierData, ...unitInfoNoTierData];
  const unitInfoLength = unitInfoList.length;
  const isUnitInfoOverLength = unitInfoLength > MaxEntriesToDisplay;
  if (isUnitInfoOverLength) {
    unitInfoList.splice(MaxEntriesToDisplay);
  }

  return (
    <div ref={elemRef}>
      <Alert variant="info">{t((t) => t.game.unitTier.tips.main)}</Alert>
      {isUnitInfoOverLength && <OverLengthWarning displayed={MaxEntriesToDisplay} returned={unitInfoLength}/>}
      <Row className="text-right mb-2">
        <Col>
          <IconCompDependent/>&nbsp;=&nbsp;{t((t) => t.game.unitTier.tips.compIcon)}
        </Col>
      </Row>
      <TierListOutputShowAll unitInfoList={unitInfoList} keyPointsData={keyPointsData}/>
    </div>
  );
};

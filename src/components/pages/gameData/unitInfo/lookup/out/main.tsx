import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';

import {UnitInfoLookupAnalyses} from '../../../../../../api-def/api';
import {useI18n} from '../../../../../../i18n/hook';
import {unitInfoToClickableProps} from '../../../../../../utils/services/resources/unitInfo/utils';
import {RowTight} from '../../../../../elements/common/grid/row';
import {UnitSearchOutputProps} from '../../../../../elements/gameData/unit/searcher/types';
import {InputData, SortOrder} from '../in/types';
import styles from '../main.module.css';
import {UnitInfoEntry} from './entry/main';


type Props = UnitSearchOutputProps<SortOrder, InputData> & {
  analyses: UnitInfoLookupAnalyses,
  disableSubscription: boolean,
};

export const UnitInfoLookupOutput = ({
  prioritizedUnitInfo,
  otherUnitInfo,
  inputData,
  analyses,
  disableSubscription,
}: Props) => {
  const {t, lang} = useI18n();

  // Split to prioritize the units that have analysis
  const unitInfoHasAnalysis = prioritizedUnitInfo
    .map((info) => ({unitInfo: info, lookupInfo: analyses[info.id]}));
  const unitInfoNoAnalysis = otherUnitInfo
    .map((info) => ({unitInfo: info, lookupInfo: undefined}));
  const unitInfoSorted = [...unitInfoHasAnalysis, ...unitInfoNoAnalysis];

  if (!unitInfoSorted.length) {
    return (
      <Alert variant="danger">
        {t((t) => t.misc.noResult)}
      </Alert>
    );
  }

  return (
    <RowTight className="mb-2">
      {unitInfoSorted.map((info) => (
        <Col
          key={info.unitInfo.id}
          className={inputData.iconOnly ? styles['icon-only-entry'] : styles['complete-entry']}
        >
          <UnitInfoEntry
            unitInfo={unitInfoToClickableProps(info.unitInfo, lang)}
            analysisMeta={info.lookupInfo}
            iconOnly={inputData.iconOnly}
            disableSubscription={disableSubscription}
          />
        </Col>
      ))}
    </RowTight>
  );
};

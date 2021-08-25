import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import {ApiResponseCode} from '../../../../../../api-def/api';
import {AppReactContext} from '../../../../../../context/app/main';
import {useI18n} from '../../../../../../i18n/hook';
import {scrollRefToTop} from '../../../../../../utils/scroll';
import {ApiRequestSender} from '../../../../../../utils/services/api/requestSender';
import {useUnitData, useUnitInfo} from '../../../../../../utils/services/resources/unitInfo/hooks';
import {useFetchState} from '../../../../../elements/common/fetch';
import {getFilteredUnitInfo} from '../../../../../elements/gameData/unit/filter/utils';
import {OverLengthWarning} from '../../../../../elements/gameData/warnings/overLength';
import {sortFunc} from '../in/sort/lookup';
import {InputData} from '../in/types';
import {MaxEntriesToDisplay} from './const';
import {UnitInfoEntry} from './entry';


type AnalysisLookupOutputProps = {
  inputData: InputData | undefined,
}

export const UnitInfoLookupOutput = ({inputData}: AnalysisLookupOutputProps) => {
  const {t, lang} = useI18n();
  const context = React.useContext(AppReactContext);

  const rowElem = React.useRef<HTMLDivElement>(null);

  const {charaInfo, dragonInfo} = useUnitInfo();
  const {nameRef} = useUnitData();
  const {
    fetchStatus: analysisMeta,
    fetchFunction: fetchAnalysisMeta,
  } = useFetchState(
    {
      code: ApiResponseCode.SUCCESS,
      success: true,
      analyses: [],
    },
    () => ApiRequestSender.analysisLookup(context?.session?.user.id.toString() || '', lang),
    'Failed to fetch analysis meta.',
  );

  // Scroll after input data has changed
  React.useEffect(() => {
    scrollRefToTop(rowElem);
  }, [inputData]);

  if (!inputData) {
    return <></>;
  }

  fetchAnalysisMeta();

  const unitInfoFiltered = getFilteredUnitInfo(inputData, charaInfo, dragonInfo, nameRef);
  // Split to prioritize the units that have analysis
  const unitInfoHasAnalysis = unitInfoFiltered
    .filter((info) => info.id in analysisMeta.data.analyses)
    .map((info) => ({unitInfo: info, lookupInfo: analysisMeta.data.analyses[info.id]}))
    .sort(sortFunc[inputData.sortBy]);
  const unitInfoNoAnalysis = unitInfoFiltered
    .filter((info) => !(info.id in analysisMeta.data.analyses))
    .map((info) => ({unitInfo: info, lookupInfo: undefined}));
  const unitInfoSorted = [...unitInfoHasAnalysis, ...unitInfoNoAnalysis];
  const unitInfoSortedLength = unitInfoSorted.length;

  if (charaInfo.length && dragonInfo.length && !unitInfoFiltered.length) {
    return (
      <h5 className="text-danger text-center">
        {t((t) => t.posts.analysis.error.noResult)}
      </h5>
    );
  }

  const isUnitInfoOverLength = unitInfoSortedLength > MaxEntriesToDisplay;
  if (isUnitInfoOverLength) {
    unitInfoSorted.splice(MaxEntriesToDisplay);
  }

  return (
    <>
      {isUnitInfoOverLength && <OverLengthWarning displayed={MaxEntriesToDisplay} returned={unitInfoSortedLength}/>}
      <Form.Row ref={rowElem}>
        {unitInfoSorted.map((info) => (
          <Col key={info.unitInfo.id} md={6} className="mb-2">
            <UnitInfoEntry
              unitInfo={info.unitInfo}
              isFetchingMeta={analysisMeta.fetching}
              analysisMeta={info.lookupInfo}
            />
          </Col>
        ))}
      </Form.Row>
    </>
  );
};

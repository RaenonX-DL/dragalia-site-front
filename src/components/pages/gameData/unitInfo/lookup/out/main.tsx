import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import {ApiResponseCode} from '../../../../../../api-def/api';
import {AppReactContext} from '../../../../../../context/app/main';
import {useI18n} from '../../../../../../i18n/hook';
import {ApiRequestSender} from '../../../../../../utils/services/api/requestSender';
import {useFetchState} from '../../../../../elements/common/fetch';
import {UnitSearchOutputProps} from '../../../../../elements/gameData/unit/searcher/types';
import {sortFunc} from '../in/sort/lookup';
import {InputData, SortOrder} from '../in/types';
import {UnitInfoEntry} from './entry';


type AnalysisLookupOutputProps = UnitSearchOutputProps<SortOrder, InputData>

export const UnitInfoLookupOutput = ({inputData, processedUnitInfo}: AnalysisLookupOutputProps) => {
  const {t, lang} = useI18n();
  const context = React.useContext(AppReactContext);

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

  fetchAnalysisMeta();

  // Split to prioritize the units that have analysis
  const unitInfoHasAnalysis = processedUnitInfo
    .filter((info) => info.id in analysisMeta.data.analyses)
    .map((info) => ({unitInfo: info, lookupInfo: analysisMeta.data.analyses[info.id]}))
    .sort(sortFunc[inputData.sortBy]);
  const unitInfoNoAnalysis = processedUnitInfo
    .filter((info) => !(info.id in analysisMeta.data.analyses))
    .map((info) => ({unitInfo: info, lookupInfo: undefined}));
  const unitInfoSorted = [...unitInfoHasAnalysis, ...unitInfoNoAnalysis];

  if (!processedUnitInfo.length) {
    return (
      <h5 className="text-danger text-center">
        {t((t) => t.posts.analysis.error.noResult)}
      </h5>
    );
  }

  return (
    <Form.Row>
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
  );
};

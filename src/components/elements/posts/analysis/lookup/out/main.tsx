import React from 'react';

import {Col, Form} from 'react-bootstrap';

import {ApiResponseCode} from '../../../../../../api-def/api';
import {useI18n} from '../../../../../../i18n/hook';
import {CookiesControl} from '../../../../../../utils/cookies';
import {scrollToTop} from '../../../../../../utils/scroll';
import {ApiRequestSender} from '../../../../../../utils/services/api/requestSender';
import {useUnitInfo} from '../../../../../../utils/services/resources/unitInfo';
import {useFetchState} from '../../../../common/fetch';
import {InputData} from '../in/types';
import {getUnitInfo} from '../utils';
import {AnalysisEntry} from './entry';

type AnalysisLookupOutputProps = {
  inputData: InputData,
}

export const AnalysisLookupOutput = ({inputData}: AnalysisLookupOutputProps) => {
  const {lang} = useI18n();

  const rowElem = React.useRef<HTMLDivElement>(null);

  const {charaInfo, dragonInfo} = useUnitInfo();
  const {
    fetchStatus: analysisMeta,
    fetchFunction: fetchAnalysisMeta,
  } = useFetchState(
    {
      code: ApiResponseCode.SUCCESS,
      success: true,
      isAdmin: false,
      analyses: [],
    },
    () => ApiRequestSender.analysisLookup(CookiesControl.getGoogleUid() || '', lang),
    'Failed to fetch analysis meta.',
  );

  fetchAnalysisMeta();

  const unitInfoFiltered = getUnitInfo(inputData, charaInfo, dragonInfo);
  // Split to prioritize the units that have analysis
  const unitInfoHasAnalysis = unitInfoFiltered.filter((info) => info.id in analysisMeta.data.analyses);
  const unitInfoNoAnalysis = unitInfoFiltered.filter((info) => !(info.id in analysisMeta.data.analyses));

  if (unitInfoFiltered.length) {
    scrollToTop(rowElem);
  }

  return (
    <Form.Row ref={rowElem}>
      {
        [...unitInfoHasAnalysis, ...unitInfoNoAnalysis]
          .map((info) => (
            <Col key={info.id} md={6} className="mb-2">
              <AnalysisEntry
                unitInfo={info}
                isFetchingMeta={analysisMeta.fetching}
                analysisMeta={analysisMeta.data.analyses[info.id]}
              />
            </Col>
          ))
      }
    </Form.Row>
  );
};
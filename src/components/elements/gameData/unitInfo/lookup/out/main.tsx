import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import {ApiResponseCode} from '../../../../../../api-def/api';
import {AppReactContext} from '../../../../../../context/app/main';
import {useI18n} from '../../../../../../i18n/hook';
import {scrollRefToTop} from '../../../../../../utils/scroll';
import {ApiRequestSender} from '../../../../../../utils/services/api/requestSender';
import {useUnitInfo} from '../../../../../../utils/services/resources/unitInfo/hooks';
import {useFetchState} from '../../../../common/fetch';
import {InputData} from '../in/types';
import {getUnitInfo} from '../utils';
import {UnitInfoEntry} from './entry';


type AnalysisLookupOutputProps = {
  inputData: InputData | undefined,
}

export const UnitInfoLookupOutput = ({inputData}: AnalysisLookupOutputProps) => {
  const {t, lang} = useI18n();
  const context = React.useContext(AppReactContext);

  const rowElem = React.useRef<HTMLDivElement>(null);

  const {charaInfo, dragonInfo} = useUnitInfo();
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

  const unitInfoFiltered = getUnitInfo(inputData, charaInfo, dragonInfo);
  // Split to prioritize the units that have analysis
  const unitInfoHasAnalysis = unitInfoFiltered.filter((info) => info.id in analysisMeta.data.analyses);
  const unitInfoNoAnalysis = unitInfoFiltered.filter((info) => !(info.id in analysisMeta.data.analyses));

  if (charaInfo.length && dragonInfo.length && !unitInfoFiltered.length) {
    return (
      <h5 className="text-danger text-center">
        {t((t) => t.posts.analysis.error.noResult)}
      </h5>
    );
  }

  return (
    <Form.Row ref={rowElem}>
      {
        [...unitInfoHasAnalysis, ...unitInfoNoAnalysis]
          .map((info) => (
            <Col key={info.id} md={6} className="mb-2">
              <UnitInfoEntry
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

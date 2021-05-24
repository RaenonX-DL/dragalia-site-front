import React from 'react';

import {Col, Form} from 'react-bootstrap';

import {
  ApiResponseCode,
  BaseResponse,
  SequencedPostInfo,
  SupportedLanguages,
  UnitType,
  UserIsAdminResponse,
} from '../../../../../../api-def/api';
import {useI18n} from '../../../../../../i18n/hook';
import {useUnitInfo} from '../../../../../../utils/services/resources/unitInfo';
import {useFetchState} from '../../../../common/fetch';
import {InputData} from '../in/types';
import {getUnitInfo} from '../utils';
import {AnalysisEntry} from './entry';

type AnalysisLookupOutputProps = {
  inputData: InputData,
}

export type AnalysisLookupEntry = Omit<SequencedPostInfo, 'title'> & {
  type: UnitType,
  unitId: number,
}

type AnalysisLookupResponse = BaseResponse &
  UserIsAdminResponse & {
  analyses: { [unitId in number]: AnalysisLookupEntry }
}

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const fetchAnalysisMetaApi = (
  lang: SupportedLanguages,
) => async (): Promise<AnalysisLookupResponse> => {
  await sleep(1000);
  return {
    code: ApiResponseCode.SUCCESS,
    success: true,
    isAdmin: false,
    analyses: {
      10140401: {
        seqId: 1,
        unitId: 10140401,
        lang,
        viewCount: 4777,
        modifiedEpoch: (new Date()).getTime() - 86400000,
        publishedEpoch: (new Date()).getTime() - 216000,
        type: UnitType.CHARACTER,
      },
      10150401: {
        seqId: 2,
        unitId: 10150401,
        lang,
        viewCount: 4777,
        modifiedEpoch: (new Date()).getTime() - 877800000,
        publishedEpoch: (new Date()).getTime() - 2106000,
        type: UnitType.CHARACTER,
      },
    },
  };
};

export const AnalysisLookupOutput = ({inputData}: AnalysisLookupOutputProps) => {
  const {lang} = useI18n();

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
    fetchAnalysisMetaApi(lang),
    'Failed to fetch analysis meta.',
  );

  fetchAnalysisMeta();

  // FIXME: Latest 3 at the top

  const unitInfoFiltered = getUnitInfo(inputData, charaInfo, dragonInfo);
  // Split to prioritize the units that have analysis
  const unitInfoHasAnalysis = unitInfoFiltered.filter((info) => info.id in analysisMeta.data.analyses);
  const unitInfoNoAnalysis = unitInfoFiltered.filter((info) => !(info.id in analysisMeta.data.analyses));

  return (
    <Form.Row>
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

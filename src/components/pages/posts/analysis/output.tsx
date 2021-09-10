import React from 'react';

import Alert from 'react-bootstrap/Alert';

import {UnitType} from '../../../../api-def/api/other/unit';
import {CharaAnalysisGetResponse, DragonAnalysisGetResponse} from '../../../../api-def/api/post/analysis/response';
import {useI18n} from '../../../../i18n/hook';
import {ApiRequestSender} from '../../../../utils/services/api/requestSender';
import {PrefetchedForm} from '../../../elements/form/prefetched/main';
import {AnalysisOutputChara} from './output/chara';
import {AnalysisOutputDragon} from './output/dragon';


export const AnalysisPage = () => {
  const {t} = useI18n();

  return (
    <PrefetchedForm
      fnFetch={ApiRequestSender.analysisGet}
      renderOnSuccess={(response) => {
        if (response.type === UnitType.CHARACTER) {
          return (
            <AnalysisOutputChara analysis={response as CharaAnalysisGetResponse}/>
          );
        }
        if (response.type === UnitType.DRAGON) {
          return (
            <AnalysisOutputDragon analysis={response as DragonAnalysisGetResponse}/>
          );
        }

        return (
          <Alert variant="danger">
            {t(
              (t) => t.posts.analysis.error.unknownType,
              // If `response.type` is really unknown, `UnitType[response.type]` might return falsy value
              {analysisType: UnitType[response.type] || response.type},
            )}
          </Alert>
        );
      }}
    />
  );
};

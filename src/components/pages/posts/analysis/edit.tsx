import React from 'react';

import Alert from 'react-bootstrap/Alert';

import {UnitType, CharaAnalysisBody, DragonAnalysisBody} from '../../../../api-def/api';
import {useI18n} from '../../../../i18n/hook';
import {ApiRequestSender} from '../../../../utils/services/api/requestSender';
import {PrefetchedForm} from '../../../elements/form/prefetched/main';
import {AnalysisFormCharaEdit} from './form/chara/edit';
import {AnalysisFormDragonEdit} from './form/dragon/edit';


export const AnalysisEdit = () => {
  const {t} = useI18n();

  return (
    <PrefetchedForm
      fnFetch={ApiRequestSender.analysisGet}
      renderOnSuccess={(response) => {
        const analysisType = response.type;

        if (analysisType === UnitType.CHARACTER) {
          return <AnalysisFormCharaEdit analysis={response as CharaAnalysisBody}/>;
        }
        if (analysisType === UnitType.DRAGON) {
          return <AnalysisFormDragonEdit analysis={response as DragonAnalysisBody}/>;
        }

        return (
          <Alert variant="danger">
            {t(
              (t) => t.posts.analysis.error.unknownType,
              // If `response.type` is really unknown, `UnitType[response.type]` might return falsy value
              {analysisType: UnitType[response.type] || response.type.toString()},
            )}
          </Alert>
        );
      }}
    />
  );
};

import React from 'react';

import {
  UnitType,
  CharaAnalysisGetResponse,
  DragonAnalysisGetResponse,
} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {OutputBase} from '../../shared/output/base';
import {AnalysisPostFetchStatus} from '../fetch';
import {AnalysisOutputChara} from './chara';
import {AnalysisOutputDragon} from './dragon';


export const AnalysisOutput = () => {
  const {t} = useI18n();

  const [status, setStatus] = React.useState<AnalysisPostFetchStatus>(
    {
      fetched: false,
      fetchFailed: false,
      post: null,
      failureMessage: '',
    },
  );

  return (
    <OutputBase
      status={status}
      setStatus={setStatus}
      fnSendFetchRequest={ApiRequestSender.analysisGet}
      renderOnFetched={(post) => {
        if (post.type === UnitType.CHARACTER) {
          return (
            <AnalysisOutputChara analysis={post as CharaAnalysisGetResponse}/>
          );
        }
        if (post.type === UnitType.DRAGON) {
          return (
            <AnalysisOutputDragon analysis={post as DragonAnalysisGetResponse}/>
          );
        }

        setStatus({
          ...status,
          fetched: true,
          fetchFailed: true,
          failureMessage: t(
            (t) => t.posts.analysis.error.unknownType,
            {analysisType: UnitType[post.type]},
          ),
        });
        return <></>;
      }}
    />
  );
};

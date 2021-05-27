import React from 'react';

import {
  UnitType,
  CharaAnalysisGetResponse,
  DragonAnalysisGetResponse,
} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {useUnitInfo} from '../../../../../utils/services/resources/unitInfo';
import {PageProps} from '../../../../pages/props';
import {OutputBase} from '../../shared/output/base';
import {AnalysisPostFetchStatus} from '../fetch';
import {AnalysisOutputChara} from './chara';
import {AnalysisOutputDragon} from './dragon';


export const AnalysisOutput = ({fnSetTitle}: PageProps) => {
  const {t, lang} = useI18n();

  const [status, setStatus] = React.useState<AnalysisPostFetchStatus>(
    {
      fetched: false,
      fetchFailed: false,
      post: null,
      failureMessage: '',
    },
  );
  const {getUnitName} = useUnitInfo();

  return (
    <OutputBase
      fnSetTitle={fnSetTitle}
      status={status}
      setStatus={setStatus}
      getTitle={(pid) => (
        t(
          (t) => t.meta.inUse.analysisPost.title,
          {
            title:
              status.post ?
                getUnitName(status.post.unitId, lang) || status.post.unitId.toString() :
                `#${pid}`,
          },
        )
      )}
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

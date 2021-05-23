import React from 'react';

import {UnitType, CharacterAnalysis, DragonAnalysis} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {PageProps} from '../../../../pages/props';
import {OutputBase} from '../../shared/output/base';
import {AnalysisPostFetchStatus} from '../fetch';
import {AnalysisOutputChara} from './chara';
import {AnalysisOutputDragon} from './dragon';


export const AnalysisOutput = ({fnSetTitle}: PageProps) => {
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
      fnSetTitle={fnSetTitle}
      status={status}
      setStatus={setStatus}
      getTitle={(pid) => (
        t(
          (t) => t.meta.inUse.analysisPost.title,
          {title: status.post?.title || `#A${pid}`},
        )
      )}
      fnSendFetchRequest={ApiRequestSender.analysisPostGet}
      renderOnFetched={(post) => {
        if (post.type === UnitType.CHARACTER) {
          return (
            <AnalysisOutputChara analysis={post as CharacterAnalysis}/>
          );
        }
        if (post.type === UnitType.DRAGON) {
          return (
            <AnalysisOutputDragon analysis={post as DragonAnalysis}/>
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

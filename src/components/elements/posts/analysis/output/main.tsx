import React from 'react';

import {AnalysisType, CharacterAnalysis, DragonAnalysis} from '../../../../../api-def/api';
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
        `#A${pid} ${status.post ? status.post.title : t((t) => t.pages.name.analysisPost)}`
      )}
      fnSendFetchRequest={ApiRequestSender.analysisPostGet}
      renderOnFetched={(post) => {
        if (post.type === AnalysisType.CHARACTER) {
          return (
            <AnalysisOutputChara analysis={post as CharacterAnalysis}/>
          );
        }
        if (post.type === AnalysisType.DRAGON) {
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
            {analysisType: AnalysisType[post.type]},
          ),
        });
        return <></>;
      }}
    />
  );
};

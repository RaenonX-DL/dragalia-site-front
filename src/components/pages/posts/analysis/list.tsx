import React from 'react';

import Path from '../../../../const/path/definitions';
import {useTranslation} from '../../../../i18n/utils';
import {ApiRequestSender} from '../../../../utils/services/api';
import {AnalysisPostList, PostListPage} from '../../../elements';
import {PageProps} from '../../props';


export const AnalysisList = ({fnSetTitle}: PageProps) => {
  const {t} = useTranslation();

  const title = t('pages.name.analysis_list');

  fnSetTitle(title);

  return (
    <PostListPage
      title={title}
      currentUrl={Path.ANALYSIS_LIST}
      postManageBarProps={{
        newButtons: [
          {
            url: Path.ANALYSIS_NEW_CHARA,
            title: t('posts.manage.add_chara'),
          },
          {
            url: Path.ANALYSIS_NEW_DRAGON,
            title: t('posts.manage.add_dragon'),
          },
        ],
      }}
      fnFetchList={ApiRequestSender.analysisPostList}
      renderPostEntries={(response) => (
        <AnalysisPostList
          entries={response.posts}
          generateLink={(postId) => Path.getAnalysis(postId)}
        />
      )}
    />
  );
};

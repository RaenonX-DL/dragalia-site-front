import React from 'react';
import {useTranslation} from 'react-i18next';
import Path from '../../../../constants/path';
import {AnalysisListEntry, ApiRequestSender} from '../../../../utils/services/api';
import {AnalysisPostList, PostListPage} from '../../../elements';

import {PageProps} from '../../base';


export const AnalysisList = ({fnSetTitle}: PageProps) => {
  const {t} = useTranslation();

  const title = t('pages.name.analysis_list');

  fnSetTitle(title);

  return (
    <PostListPage
      fnFetchList={ApiRequestSender.analysisPostList}
      fnGetPostListJsx={
        (posts) =>
          <AnalysisPostList
            posts={posts as Array<AnalysisListEntry>}
            linkGenerator={(id) => Path.getAnalysis(id)}/>
      }
      title={title} currentUrl={Path.ANALYSIS_LIST}
      postManageBarProps={{
        newPostUrl: Path.ANALYSIS_NEW_CHARA,
        newPostTitle: t('posts.manage.add_chara'),
        newPostUrl2: Path.ANALYSIS_NEW_DRAGON,
        newPostTitle2: t('posts.manage.add_dragon'),
      }}/>
  );
};

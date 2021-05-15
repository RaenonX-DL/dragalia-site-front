import React from 'react';

import {GeneralPath, makeSimplePath, makePostPath, PostPath} from '../../../../const/path';
import {useI18n} from '../../../../i18n/hook';
import {ApiRequestSender} from '../../../../utils/services/api';
import {AnalysisPostList, PostListPage} from '../../../elements';
import {PageProps} from '../../props';


export const AnalysisList = ({fnSetTitle}: PageProps) => {
  const {t, lang} = useI18n();

  const title = t((t) => t.pages.name.analysisList);

  fnSetTitle(title);

  return (
    <PostListPage
      title={title}
      currentUrl={makeSimplePath(GeneralPath.ANALYSIS_LIST, {lang})}
      postManageBarProps={{
        newButtons: [
          {
            url: makeSimplePath(GeneralPath.ANALYSIS_NEW_CHARA, {lang}),
            title: t((t) => t.posts.manage.addChara),
          },
          {
            url: makeSimplePath(GeneralPath.ANALYSIS_NEW_DRAGON, {lang}),
            title: t((t) => t.posts.manage.addDragon),
          },
        ],
      }}
      fnFetchList={ApiRequestSender.analysisPostList}
      renderPostEntries={(response) => (
        <AnalysisPostList
          entries={response.posts}
          generateLink={(pid) => makePostPath(PostPath.ANALYSIS, {pid, lang})}
        />
      )}
    />
  );
};

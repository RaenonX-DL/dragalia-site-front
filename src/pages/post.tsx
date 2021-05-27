import React from 'react';

import {AdminRoute} from '../components/elements/route/admin';
import {PublicRoute} from '../components/elements/route/public';
import {AnalysisLookup} from '../components/pages';
import {Constructing} from '../components/pages/constructing';
import {AnalysisEdit} from '../components/pages/posts/analysis/edit';
import {AnalysisNewChara, AnalysisNewDragon} from '../components/pages/posts/analysis/new';
import {AnalysisPage} from '../components/pages/posts/analysis/page';
import {QuestEdit} from '../components/pages/posts/quest/edit';
import {QuestList} from '../components/pages/posts/quest/list';
import {QuestNew} from '../components/pages/posts/quest/new';
import {QuestPage} from '../components/pages/posts/quest/page';
import {GeneralPath, PostPath} from '../const/path/definitions';
import {PageContentProps} from './types';

export const PageContentPost = ({updatePageTitle}: PageContentProps) => {
  return (
    <>
      <PublicRoute path={GeneralPath.QUEST_LIST}>
        <QuestList fnSetTitle={updatePageTitle}/>
      </PublicRoute>
      <AdminRoute path={GeneralPath.QUEST_NEW}>
        <QuestNew fnSetTitle={updatePageTitle}/>
      </AdminRoute>
      <PublicRoute path={PostPath.QUEST}>
        <QuestPage fnSetTitle={updatePageTitle}/>
      </PublicRoute>
      <AdminRoute path={PostPath.QUEST_EDIT}>
        <QuestEdit fnSetTitle={updatePageTitle}/>
      </AdminRoute>

      <PublicRoute path={GeneralPath.ANALYSIS_LIST}>
        <AnalysisLookup fnSetTitle={updatePageTitle}/>
      </PublicRoute>
      <AdminRoute path={GeneralPath.ANALYSIS_NEW_CHARA}>
        <AnalysisNewChara fnSetTitle={updatePageTitle}/>
      </AdminRoute>
      <AdminRoute path={GeneralPath.ANALYSIS_NEW_DRAGON}>
        <AnalysisNewDragon fnSetTitle={updatePageTitle}/>
      </AdminRoute>
      <PublicRoute path={PostPath.ANALYSIS}>
        <AnalysisPage fnSetTitle={updatePageTitle}/>
      </PublicRoute>
      <AdminRoute path={PostPath.ANALYSIS_EDIT}>
        <AnalysisEdit fnSetTitle={updatePageTitle}/>
      </AdminRoute>

      <PublicRoute path={GeneralPath.MISC_LIST}>
        <Constructing fnSetTitle={updatePageTitle}/>
      </PublicRoute>
      <PublicRoute path={PostPath.MISC}>
        <Constructing fnSetTitle={updatePageTitle}/>
      </PublicRoute>
    </>
  );
};

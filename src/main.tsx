import React, {Suspense, useEffect} from 'react';

import {Container} from 'react-bootstrap';
import {Route} from 'react-router-dom';

import {AdminRoute, Footer, GlobalAlert, Navigation, PageLoading, PublicRoute} from './components/elements';
import {
  About,
  AnalysisEdit,
  AnalysisList,
  AnalysisNewChara,
  AnalysisNewDragon,
  AnalysisPage,
  AttackingSkillPage,
  Constructing,
  ExAbilityPage,
  Home,
  QuestEdit,
  QuestList,
  QuestNew,
  QuestPage,
} from './components/pages';
import {SpecialThanks} from './components/pages/thanks';
import {GeneralPath, PathRoot, PostPath} from './const/path';
import {useI18n} from './i18n/hook';
import {SiteAlert} from './siteAlert';
import {ReduxProvider, ReduxProviderProps} from './state/provider';
import {GoogleAnalytics} from './utils/services/ga';


type PageContentProps = {
  updatePageTitle: (newTitle?: string) => void
}


const PageContent = ({updatePageTitle}: PageContentProps) => {
  return (
    <Route path={PathRoot}>
      {/* Home */}

      <PublicRoute path={GeneralPath.HOME}>
        <Home fnSetTitle={updatePageTitle}/>
      </PublicRoute>

      {/* Posts */}

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
        <AnalysisList fnSetTitle={updatePageTitle}/>
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

      {/* In-game data */}

      <PublicRoute path={GeneralPath.EX}>
        <ExAbilityPage fnSetTitle={updatePageTitle}/>
      </PublicRoute>

      <PublicRoute path={GeneralPath.SKILL_ATK}>
        <AttackingSkillPage fnSetTitle={updatePageTitle}/>
      </PublicRoute>
      <PublicRoute path={GeneralPath.SKILL_SUP}>
        <Constructing fnSetTitle={updatePageTitle}/>
      </PublicRoute>

      <PublicRoute path={GeneralPath.STORY}>
        <Constructing fnSetTitle={updatePageTitle}/>
      </PublicRoute>

      {/* Tools */}

      <PublicRoute path={GeneralPath.ROTATION_CALC}>
        <Constructing fnSetTitle={updatePageTitle}/>
      </PublicRoute>

      {/* Not game related */}

      <PublicRoute path={GeneralPath.ABOUT}>
        <About fnSetTitle={updatePageTitle}/>
      </PublicRoute>
      <PublicRoute path={GeneralPath.SPECIAL_THANKS}>
        <SpecialThanks fnSetTitle={updatePageTitle}/>
      </PublicRoute>
    </Route>
  );
};


const PageMain = () => {
  const {t} = useI18n();

  const ref = React.useRef<HTMLHeadingElement>(null) as React.MutableRefObject<HTMLHeadingElement>;
  const title = React.useRef<string>(t((t) => t.meta.inUse.site.title));

  const updatePageTitle = (newTitle?: string) => {
    newTitle = newTitle || t((t) => t.meta.inUse.site.title);

    if (!newTitle) {
      newTitle = '';
    }

    // Set the title element and the document title
    title.current = newTitle;
    document.title = newTitle + t((t) => t.meta.suffix);

    if (ref.current) {
      // Title element linked, set new title to it & record the page title
      ref.current.innerText = newTitle;

      // This needs to be placed after the document title update because
      // this method sends the current page title
      // Not using history API because it's updated right after the navigation.
      // Title may be loaded later.
      GoogleAnalytics.pageView(window.location);
    }
  };

  // After the page render completed
  useEffect(() => {
    // Ensure that the title has been set
    document.title = title.current;
    ref.current.innerText = title.current;
  });

  return (
    <>
      <Navigation ref={ref}/>

      <SiteAlert/>

      <Container className="p-3">
        <GlobalAlert/>

        <PageContent updatePageTitle={updatePageTitle}/>
      </Container>

      <Footer/>
    </>
  );
};

const Main = (props: ReduxProviderProps) => {
  return (
    <ReduxProvider {...props}>
      <Suspense fallback={<PageLoading/>}>
        <PageMain/>
      </Suspense>
    </ReduxProvider>
  );
};

export default Main;

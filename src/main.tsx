import React, {Suspense, useEffect} from 'react';

import {Container} from 'react-bootstrap';

import {
  Footer,
  Navigation,
  PageLoading,
  GlobalAlert,
  AdminRoute,
  PublicRoute,
} from './components/elements';
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
import Path from './const/path/definitions';
import {useTranslation} from './i18n/utils';
import {SiteAlert} from './siteAlert';
import {ReduxProvider, ReduxProviderProps} from './state/provider';
import {GoogleAnalytics} from './utils/services/ga';


type PageContentProps = {
  updatePageTitle: (newTitle?: string) => void
}


const PageContent = ({updatePageTitle}: PageContentProps) => {
  return (
    <>
      {/* Home */}

      <PublicRoute path={Path.HOME}>
        <Home fnSetTitle={updatePageTitle}/>
      </PublicRoute>

      {/* Posts */}

      <PublicRoute path={Path.QUEST_LIST}>
        <QuestList fnSetTitle={updatePageTitle}/>
      </PublicRoute>
      <AdminRoute path={Path.QUEST_NEW}>
        <QuestNew fnSetTitle={updatePageTitle}/>
      </AdminRoute>
      <PublicRoute path={Path.QUEST}>
        <QuestPage fnSetTitle={updatePageTitle}/>
      </PublicRoute>
      <AdminRoute path={Path.QUEST_EDIT}>
        <QuestEdit fnSetTitle={updatePageTitle}/>
      </AdminRoute>

      <PublicRoute path={Path.ANALYSIS_LIST}>
        <AnalysisList fnSetTitle={updatePageTitle}/>
      </PublicRoute>
      <AdminRoute path={Path.ANALYSIS_NEW_CHARA}>
        <AnalysisNewChara fnSetTitle={updatePageTitle}/>
      </AdminRoute>
      <AdminRoute path={Path.ANALYSIS_NEW_DRAGON}>
        <AnalysisNewDragon fnSetTitle={updatePageTitle}/>
      </AdminRoute>
      <PublicRoute path={Path.ANALYSIS}>
        <AnalysisPage fnSetTitle={updatePageTitle}/>
      </PublicRoute>
      <AdminRoute path={Path.ANALYSIS_EDIT}>
        <AnalysisEdit fnSetTitle={updatePageTitle}/>
      </AdminRoute>

      <PublicRoute path={Path.MISC_LIST}>
        <Constructing fnSetTitle={updatePageTitle}/>
      </PublicRoute>
      <PublicRoute path={Path.MISC}>
        <Constructing fnSetTitle={updatePageTitle}/>
      </PublicRoute>

      {/* In-game data */}

      <PublicRoute path={Path.EX}>
        <ExAbilityPage fnSetTitle={updatePageTitle}/>
      </PublicRoute>
      <PublicRoute path={Path.PRINT}>
        <Constructing fnSetTitle={updatePageTitle}/>
      </PublicRoute>

      <PublicRoute path={Path.SKILL_ATK}>
        <AttackingSkillPage fnSetTitle={updatePageTitle}/>
      </PublicRoute>
      <PublicRoute path={Path.SKILL_SUP}>
        <Constructing fnSetTitle={updatePageTitle}/>
      </PublicRoute>

      <PublicRoute path={Path.STORY}>
        <Constructing fnSetTitle={updatePageTitle}/>
      </PublicRoute>

      {/* Tools */}

      <PublicRoute path={Path.ROTATION_CALC}>
        <Constructing fnSetTitle={updatePageTitle}/>
      </PublicRoute>

      {/* Not game related */}

      <PublicRoute path={Path.ABOUT}>
        <About fnSetTitle={updatePageTitle}/>
      </PublicRoute>
      <PublicRoute path={Path.SPECIAL_THANKS}>
        <SpecialThanks fnSetTitle={updatePageTitle}/>
      </PublicRoute>
    </>
  );
};


const PageMain = () => {
  const {t} = useTranslation();

  const ref = React.useRef<HTMLHeadingElement>(null) as React.MutableRefObject<HTMLHeadingElement>;
  const title = React.useRef<string>(t('pages.name.site'));

  const updatePageTitle = (newTitle?: string) => {
    newTitle = newTitle || t('pages.name.site');

    if (!newTitle) {
      newTitle = '';
    }

    // Set the title element and the document title
    title.current = newTitle;
    document.title = newTitle + t('pages.name.suffix');

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

import React, {Suspense, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {Route} from 'react-router-dom';
import {Footer, Navigation, PageLoading} from './components/elements';

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
import Path from './constants/path';
import {GoogleAnalytics} from './utils/services/ga';


type PageContentProps = {
  updatePageTitle: (newTitle?: string) => void
}


const PageContent = ({updatePageTitle}: PageContentProps) => {
  return (
    <>
      {/* Home */}

      <Route exact path={Path.HOME}>
        <Home fnSetTitle={updatePageTitle}/>
      </Route>

      {/* Posts */}

      <Route exact path={Path.QUEST_LIST}>
        <QuestList fnSetTitle={updatePageTitle}/>
      </Route>
      <Route exact path={Path.QUEST_NEW}>
        <QuestNew fnSetTitle={updatePageTitle}/>
      </Route>
      <Route exact path={Path.QUEST}>
        <QuestPage fnSetTitle={updatePageTitle}/>
      </Route>
      <Route exact path={Path.QUEST_EDIT}>
        <QuestEdit fnSetTitle={updatePageTitle}/>
      </Route>

      <Route exact path={Path.ANALYSIS_LIST}>
        <AnalysisList fnSetTitle={updatePageTitle}/>
      </Route>
      <Route exact path={Path.ANALYSIS_NEW_CHARA}>
        <AnalysisNewChara fnSetTitle={updatePageTitle}/>
      </Route>
      <Route exact path={Path.ANALYSIS_NEW_DRAGON}>
        <AnalysisNewDragon fnSetTitle={updatePageTitle}/>
      </Route>
      <Route exact path={Path.ANALYSIS}>
        <AnalysisPage fnSetTitle={updatePageTitle}/>
      </Route>
      <Route exact path={Path.ANALYSIS_EDIT}>
        <AnalysisEdit fnSetTitle={updatePageTitle}/>
      </Route>

      <Route exact path={Path.MISC_LIST}>
        <Constructing fnSetTitle={updatePageTitle}/>
      </Route>
      <Route exact path={Path.MISC}>
        <Constructing fnSetTitle={updatePageTitle}/>
      </Route>

      {/* In-game data */}

      <Route exact path={Path.EX}>
        <ExAbilityPage fnSetTitle={updatePageTitle}/>
      </Route>
      <Route exact path={Path.PRINT}>
        <Constructing fnSetTitle={updatePageTitle}/>
      </Route>

      <Route exact path={Path.SKILL_ATK}>
        <AttackingSkillPage fnSetTitle={updatePageTitle}/>
      </Route>
      <Route exact path={Path.SKILL_SUP}>
        <Constructing fnSetTitle={updatePageTitle}/>
      </Route>

      <Route exact path={Path.STORY}>
        <Constructing fnSetTitle={updatePageTitle}/>
      </Route>

      {/* Tools */}

      <Route exact path={Path.ROTATION_CALC}>
        <Constructing fnSetTitle={updatePageTitle}/>
      </Route>

      {/* Not game related */}

      <Route exact path={Path.ABOUT}>
        <About fnSetTitle={updatePageTitle}/>
      </Route>
    </>
  );
};


const PageMain = () => {
  const {t} = useTranslation();

  const ref = React.useRef<HTMLSpanElement>(null) as React.MutableRefObject<HTMLSpanElement>;
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

      <Container className="p-3">
        <PageContent updatePageTitle={updatePageTitle}/>
      </Container>

      <Footer/>
    </>
  );
};

const Main = () => {
  return (
    <Suspense fallback={<PageLoading/>}>
      <PageMain/>
    </Suspense>
  );
};

export default Main;

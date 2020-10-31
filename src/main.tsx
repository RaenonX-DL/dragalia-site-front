import React, {Suspense, useEffect} from 'react';
import {Route, useHistory} from 'react-router-dom';
import {Container, Spinner} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import ReactGA from 'react-ga';

import {
  About,
  AnalysisEdit,
  AnalysisList,
  AnalysisNewChara,
  AnalysisNewDragon,
  AnalysisPage,
  Constructing,
  Home,
  QuestEdit,
  QuestList,
  QuestNew,
  QuestPage,
} from './components/pages';
import {Footer, Navigation} from './components/elements';
import Path from './constants/path';


// TODO: Add delete post function
// FIXME: Anchor for sections


const PageMain = () => {
  const {t} = useTranslation();

  const ref = React.useRef<HTMLSpanElement>(null) as React.MutableRefObject<HTMLSpanElement>;
  const title = React.useRef<string>(t('pages.name.site'));

  const updatePageTitle = (newTitle?: string) => {
    newTitle = newTitle || t('pages.name.site');

    if (!newTitle) {
      newTitle = '';
    }

    if (ref.current) {
      ref.current.innerText = newTitle;
    }

    title.current = newTitle;
    document.title = newTitle + t('pages.name.suffix');
  };

  // Ensure that the title has been set
  useEffect(() => {
    document.title = title.current;
    ref.current.innerText = title.current;
  });

  return (
    <>
      <Navigation ref={ref}/>
      <Container className="p-3">
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

        <Route exact path={Path.CEX}>
          <Constructing fnSetTitle={updatePageTitle}/>
        </Route>
        <Route exact path={Path.PRINT}>
          <Constructing fnSetTitle={updatePageTitle}/>
        </Route>

        <Route exact path={Path.SKILL_ATK}>
          <Constructing fnSetTitle={updatePageTitle}/>
        </Route>
        <Route exact path={Path.SKILL_SUP}>
          <Constructing fnSetTitle={updatePageTitle}/>
        </Route>

        <Route exact path={Path.STORY}>
          <Constructing fnSetTitle={updatePageTitle}/>
        </Route>

        {/* Tools */}

        <Route exact path={Path.DMG_CALC}>
          <Constructing fnSetTitle={updatePageTitle}/>
        </Route>
        <Route exact path={Path.ROTATION_CALC}>
          <Constructing fnSetTitle={updatePageTitle}/>
        </Route>

        {/* Not game related */}

        <Route exact path={Path.ABOUT}>
          <About fnSetTitle={updatePageTitle}/>
        </Route>
      </Container>

      <Footer/>
    </>
  );
};

const PageLoading = () => (
  <>
    <div className="d-flex justify-content-center" style={{minHeight: '100vh', alignItems: 'center'}}>
      <Spinner animation="border" variant="light" style={{minHeight: '8vh', minWidth: '8vh'}}/>
      <span className="ml-3" style={{fontSize: '8vh'}}>Loading...</span>
    </div>
  </>
);

const Main = () => {
  const history = useHistory();

  useEffect(
    () => {
      return history.listen((location) => {
        ReactGA.set({page: location.pathname});
        ReactGA.pageview(location.pathname);
      });
    },
    [history],
  );

  return (
    <Suspense fallback={<PageLoading/>}>
      <PageMain/>
    </Suspense>
  );
};

export default Main;

import React, {Suspense, useEffect} from 'react';
import {Route, useHistory} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import {useTranslation} from 'react-i18next';
import ReactGA from 'react-ga';

import {About, Constructing, Home, QuestEdit, QuestList, QuestNew, QuestPage} from './components/pages';
import {Footer, Navigation} from './components/elements';
import Path from './constants/path';

const Page = () => {
  const {t} = useTranslation();

  const ref = React.useRef<HTMLSpanElement>();

  const updatePageTitle = (newTitle?: string) => {
    newTitle = newTitle || t('pages.name.site');

    if (!newTitle) {
      newTitle = '';
    }

    // FIXME: this causes some page not using the correct title - use context?
    // `ref.current` can be null before ref is "connected"
    if (ref.current) {
      ref.current.innerText = newTitle;
    }

    document.title = newTitle + t('pages.name.suffix');
    return newTitle;
  };

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

        <Route exact path={Path.NEW_OBJECT_LIST}>
          <Constructing fnSetTitle={updatePageTitle}/>
        </Route>
        <Route exact path={Path.NEW_OBJECT}>
          <Constructing fnSetTitle={updatePageTitle}/>
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
  <div>
    Loading...
  </div>
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
      <Page/>
    </Suspense>
  );
};

export default Main;

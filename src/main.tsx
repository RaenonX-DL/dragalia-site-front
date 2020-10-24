import React, {Suspense} from 'react';
import {Route} from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import {About, Home, NotImplemented, QuestDir, QuestNew, QuestPage} from './components/pages';
import {Footer, Navigation} from './components/elements';
import Path from './constants/path';

const Page = () => {
  return (
    <>
      <Navigation/>
      <Container className="p-3">
        {/* Home */}

        <Route exact path={Path.HOME} component={Home}/>

        {/* Posts */}

        <Route exact path={Path.QUEST_DIR} component={QuestDir}/>
        <Route exact path={Path.QUEST_NEW} component={QuestNew}/>
        <Route exact path={Path.QUEST} component={QuestPage}/>

        <Route exact path={Path.NEW_OBJECT_DIR} component={NotImplemented}/>
        <Route exact path={Path.NEW_OBJECT} component={NotImplemented}/>

        <Route exact path={Path.MISC_DIR} component={NotImplemented}/>
        <Route exact path={Path.MISC} component={NotImplemented}/>

        {/* In-game data */}

        <Route exact path={Path.CEX} component={NotImplemented}/>
        <Route exact path={Path.PRINT} component={NotImplemented}/>

        <Route exact path={Path.SKILL_ATK} component={NotImplemented}/>
        <Route exact path={Path.SKILL_SUP} component={NotImplemented}/>

        <Route exact path={Path.STORY} component={NotImplemented}/>

        {/* Tools */}

        <Route exact path={Path.DMG_CALC} component={NotImplemented}/>
        <Route exact path={Path.ROTATION_CALC} component={NotImplemented}/>

        {/* Not game related */}

        <Route exact path={Path.ABOUT} component={About}/>
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

const Main = () => (
  <Suspense fallback={<PageLoading/>}>
    <Page/>
  </Suspense>
);

export default Main;

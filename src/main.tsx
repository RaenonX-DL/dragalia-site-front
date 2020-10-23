import React, {Suspense} from 'react';
import {Route} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

import {About, Home, Quest} from './components/pages';
import {Navigation} from './components/elements';
import Path from './constants/path';

const Page = () => {
  return (
    <>
      <Navigation/>
      <Container className="p-3">
        <Jumbotron>
          <h1 className="header">Welcome To React-Bootstrap</h1>
          Current Page is{' '}
        </Jumbotron>

        <Route exact path={Path.HOME} component={Home}/>
        <Route exact path={Path.ABOUT} component={About}/>
        <Route exact path={Path.QUEST} component={Quest}/>
      </Container>
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

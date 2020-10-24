import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import ReactGA from 'react-ga';

import './index.css';
import Main from './main';
import * as serviceWorker from './serviceWorker';

// Style sheets
import './bootstrap.css';

// import i18n (needs to be bundled)
import './i18n';

// Initialize Google Analytics
ReactGA.initialize('G-75EMZWS1L3');

ReactDOM.render(
  <BrowserRouter>
    <Main/>
  </BrowserRouter>,
  document.getElementById('root'),
);

serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './bootstrap.css';

// import i18n (needs to be bundled)
import './i18n';

// Style sheets
import './index.css';

import Main from './main';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    <Main/>
  </BrowserRouter>,
  document.getElementById('root'),
);

serviceWorker.unregister();

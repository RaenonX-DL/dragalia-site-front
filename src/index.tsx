import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import './index.css';
import Main from './main';
import * as serviceWorker from './serviceWorker';

// Style sheets
import './bootstrap.css';

// import i18n (needs to be bundled)
import './i18n';

ReactDOM.render(
  <BrowserRouter>
    <Main/>
  </BrowserRouter>,
  document.getElementById('root'),
);

serviceWorker.unregister();

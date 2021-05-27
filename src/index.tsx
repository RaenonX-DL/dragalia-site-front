import React from 'react';

import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import {Main} from './main';
import {ReduxProvider} from './state/provider';

// Style sheets
import './bootstrap.css';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <ReduxProvider>
      <Main/>
    </ReduxProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

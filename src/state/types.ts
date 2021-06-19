import {PreloadedState} from 'redux';

import rootReducer from './reducer';
import {createStore} from './store';


export type StateBase = {};

export type ReduxState = ReturnType<typeof rootReducer>;

export type PreloadedReduxState = PreloadedState<ReduxState>;

export type ReduxStore = ReturnType<typeof createStore>;

export type Dispatcher = ReduxStore['dispatch'];

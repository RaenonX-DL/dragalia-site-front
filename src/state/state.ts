import {PreloadedState} from 'redux';

import rootReducer from './reducer';


export type ReduxState = ReturnType<typeof rootReducer>;

export type PreloadedReduxState = PreloadedState<ReduxState>;

import {DeepPartial} from 'redux';

import rootReducer from './reducer';

/**
 * Type of the redux state body.
 */
export type ReduxState = ReturnType<typeof rootReducer>;

/**
 * Same as {@link ReduxState}, but all keys are optional.
 *
 * One of the use case of this is to set the state by directly passing in a partial object.
 */
export type PartialReduxState = DeepPartial<ReduxState>;

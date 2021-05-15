import {createAction} from '@reduxjs/toolkit';

import {ConfigData} from './data';
import {ConfigDispatcherName} from './name';

export const configDispatchers = {
  [ConfigDispatcherName.SET_CONFIG]: createAction<ConfigData>(ConfigDispatcherName.SET_CONFIG),
};

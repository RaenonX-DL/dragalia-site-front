import {createAction} from '@reduxjs/toolkit';

import {LayoutDispatcherName} from './types';


export const layoutDispatchers = {
  [LayoutDispatcherName.CHANGE_FLUID]: createAction<boolean>(LayoutDispatcherName.CHANGE_FLUID),
  [LayoutDispatcherName.CHANGE_COLLAPSE]: createAction<boolean>(LayoutDispatcherName.CHANGE_COLLAPSE),
};

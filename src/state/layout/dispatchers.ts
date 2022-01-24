import {createAction} from '@reduxjs/toolkit';

import {LayoutDispatcherName, LayoutWidthType} from './types';


export const layoutDispatchers = {
  [LayoutDispatcherName.CHANGE_WIDTH]: createAction<LayoutWidthType>(LayoutDispatcherName.CHANGE_WIDTH),
  [LayoutDispatcherName.CHANGE_COLLAPSE]: createAction<boolean>(LayoutDispatcherName.CHANGE_COLLAPSE),
};

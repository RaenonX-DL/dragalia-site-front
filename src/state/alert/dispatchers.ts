import {createAction} from '@reduxjs/toolkit';

import {AlertData, AlertDispatcherName} from './types';


export const alertDispatchers = {
  [AlertDispatcherName.SHOW_ALERT]: createAction<AlertData>(AlertDispatcherName.SHOW_ALERT),
  [AlertDispatcherName.ALERT_CLOSED]: createAction(AlertDispatcherName.ALERT_CLOSED),
};

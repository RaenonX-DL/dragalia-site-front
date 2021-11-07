import {Variant} from 'react-bootstrap/types';

import {StateBase} from '../types';


export const ALERT_STATE_NAME = 'alert';

export enum AlertDispatcherName {
  SHOW_ALERT = 'showAlert',
  ALERT_CLOSED = 'alertClosed',
}

export type AlertData = {
  message: string,
  variant: Variant,
};

export type AlertState = StateBase & AlertData;

export type AlertSelectorReturn = AlertData & {
  show: boolean,
};

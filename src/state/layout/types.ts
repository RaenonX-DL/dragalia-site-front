import {StateBase} from '../types';


export const LAYOUT_STATE_NAME = 'layout';

export enum LayoutDispatcherName {
  CHANGE_WIDTH = 'changeWidth',
  CHANGE_COLLAPSE = 'changeCollapse',
}

export type LayoutWidthType = 'full' | 'wide' | 'mid';

export type LayoutData = {
  collapse: boolean,
  width: LayoutWidthType,
};

export type LayoutDataState = StateBase & LayoutData;

export type LayoutDataSelectorReturn = LayoutData;

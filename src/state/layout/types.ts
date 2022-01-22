import {StateBase} from '../types';


export const LAYOUT_STATE_NAME = 'layout';

export enum LayoutDispatcherName {
  CHANGE_WIDTH = 'changeWidth',
  CHANGE_COLLAPSE = 'changeCollapse',
}

export const LayoutWidthTypeObj = {
  full: undefined,
  wide: undefined,
  mid: undefined,
};

export type LayoutWidthType = keyof typeof LayoutWidthTypeObj;

export type LayoutData = {
  collapse: boolean,
  width: LayoutWidthType,
};

export type LayoutDataState = StateBase & LayoutData;

export type LayoutDataSelectorReturn = LayoutData;

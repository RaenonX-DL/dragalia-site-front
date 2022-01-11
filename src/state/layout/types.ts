import {StateBase} from '../types';


export const LAYOUT_STATE_NAME = 'layout';

export enum LayoutDispatcherName {
  CHANGE_FLUID = 'changeFluid',
  CHANGE_COLLAPSE = 'changeCollapse',
}

export type LayoutData = {
  collapse: boolean,
  fluid: boolean,
};

export type LayoutDataState = StateBase & LayoutData;

export type LayoutDataSelectorReturn = LayoutData;

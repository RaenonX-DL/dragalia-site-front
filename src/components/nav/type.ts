import React from 'react';

import {GeneralPath, PagePath} from '../../api-def/paths';
import {GetTranslationFunction} from '../../i18n/types';


export type NavItemCommon = {
  pathnameNoLang?: string,
};

export type NavItemHeader = NavItemCommon & {
  type: 'header',
  text: GetTranslationFunction,
};

export type NavItemPath = NavItemCommon & {
  type: 'path',
  text: GetTranslationFunction,
  disabled?: boolean,
  onClick?: () => void,
  activeOverride?: boolean,
  adminOnly?: boolean,
} & ({
  path?: GeneralPath,
  pathActiveBasis?: PagePath[],
  href?: never,
} | {
  path?: never,
  pathActiveBasis?: never,
  href?: string,
});

export type NavItemText = NavItemCommon & {
  type: 'text',
  text: GetTranslationFunction,
};

export type NavItemDivider = NavItemCommon & {
  type: 'divider',
};

export type NavItemDropdownContainable =
  NavItemHeader |
  NavItemPath |
  NavItemText |
  NavItemDivider;

export type NavItemDropdownTitleProps = {
  open: boolean,
  setOpen: (newState: boolean) => void,
  isAnyPathActive: boolean,
};

export type NavItemDropdown = NavItemCommon & {
  type: 'dropdown',
  entries: NavItemDropdownContainable[],
} & ({
  text: GetTranslationFunction,
  renderTitle?: never,
} | {
  text?: never,
  renderTitle: (props: NavItemDropdownTitleProps) => React.ReactNode,
});

export type NavItemReactComponent = NavItemCommon & {
  type: 'component',
  renderComponent: () => React.ReactNode,
};

export type NavItemEntry = NavItemDropdownContainable | NavItemDropdown | NavItemReactComponent;

export type NavItems = NavItemEntry[];

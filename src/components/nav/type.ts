import React from 'react';

import {GeneralPath} from '../../const/path/definitions';
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
} & ({
  path?: GeneralPath,
  href?: never,
} | {
  path?: never,
  href?: string,
});

export type NavItemText = NavItemCommon & {
  type: 'text',
  text: GetTranslationFunction,
};

export type NavItemDivider = NavItemCommon & {
  type: 'divider',
};

export type NavItemDropdownContainable = NavItemHeader | NavItemPath | NavItemText | NavItemDivider;

export type NavItemDropdownTitleProps = {
  open: boolean,
  setOpen: (newState: boolean) => void,
  isAnyPathActive: boolean,
};

export type NavItemDropdown = NavItemCommon & {
  type: 'dropdown',
  text: GetTranslationFunction,
  entries: NavItemDropdownContainable[],
  renderTitle?: (props: NavItemDropdownTitleProps) => React.ReactNode,
};

export type NavItemReactComponent = NavItemCommon & {
  type: 'component',
  renderComponent: () => React.ReactNode,
};

export type NavItemEntry = NavItemDropdownContainable | NavItemDropdown | NavItemReactComponent;

export type NavItems = NavItemEntry[];

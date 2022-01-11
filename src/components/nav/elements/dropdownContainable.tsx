import React from 'react';

import {NavItemDropdownContainable} from '../type';
import {NavDivider} from './divider';
import {NavHeader} from './header';
import {NavPath} from './path';
import {NavText} from './text';


type Props = NavItemDropdownContainable;

export const NavDropdownContainable = (props: Props) => {
  const {type} = props;

  if (type === 'divider') {
    return <NavDivider {...props}/>;
  }
  if (type === 'header') {
    return <NavHeader {...props}/>;
  }
  if (type === 'path') {
    return <NavPath {...props}/>;
  }
  if (type === 'text') {
    return <NavText {...props}/>;
  }

  throw new Error(`Unhandled element type: ${type}`);
};

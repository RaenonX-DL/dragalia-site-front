import React from 'react';

import {Nav} from 'react-bootstrap';

import {NavProps} from './types';

export const NavItem = ({text, path}: NavProps) => {
  // FIXME: Check if the nav item is clickable (<Link> works)
  return (
    <Nav.Link href={path}>
      {text}
    </Nav.Link>
  );
};

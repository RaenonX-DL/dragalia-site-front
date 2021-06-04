import React from 'react';

import Link from 'next/link';
import {NavDropdown} from 'react-bootstrap';

import {NavProps} from './types';


export const NavDropdownItem = ({text, path}: NavProps) => {
  // FIXME: Check if the nav item is clickable (<Link> works)
  return (
    <Link href={path}>
      <NavDropdown.Item>
        {text}
      </NavDropdown.Item>
    </Link>
  );
};

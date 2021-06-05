import React from 'react';

import {useRouter} from 'next/router';
import {NavDropdown} from 'react-bootstrap';

import {NavProps} from './types';


export const NavDropdownItem = ({text, path}: NavProps) => {
  const {pathname} = useRouter();

  return (
    <NavDropdown.Item href={path} className={path === pathname ? 'active' : ''}>
      {text}
    </NavDropdown.Item>
  );
};

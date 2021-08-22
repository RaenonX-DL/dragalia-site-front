import React from 'react';

import NavDropdown from 'react-bootstrap/NavDropdown';

import {useNextRouter} from '../../../utils/router';
import {NavProps} from './types';


export const NavDropdownItem = ({text, path}: NavProps) => {
  const {pathnameNoLang} = useNextRouter();

  return (
    <NavDropdown.Item href={path} className={path === pathnameNoLang ? 'active' : ''}>
      {text}
    </NavDropdown.Item>
  );
};

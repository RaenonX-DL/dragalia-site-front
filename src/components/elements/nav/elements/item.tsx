import React from 'react';

import {Nav} from 'react-bootstrap';

import {useNextRouter} from '../../../../utils/router';
import {NavProps} from './types';


export const NavItem = ({text, path}: NavProps) => {
  const {pathnameNoLang} = useNextRouter();

  return (
    <Nav.Link href={path} className={path === pathnameNoLang ? 'active' : ''}>
      {text}
    </Nav.Link>
  );
};

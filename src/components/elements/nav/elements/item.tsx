import React from 'react';

import {useRouter} from 'next/router';
import {Nav} from 'react-bootstrap';

import {NavProps} from './types';

export const NavItem = ({text, path}: NavProps) => {
  const {pathname} = useRouter();

  return (
    <Nav.Link href={path} className={path === pathname ? 'active' : ''}>
      {text}
    </Nav.Link>
  );
};

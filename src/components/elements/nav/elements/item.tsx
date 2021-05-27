import React from 'react';

import {Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import {useI18n} from '../../../../i18n/hook';
import {makeSimplePath} from '../../../../utils/path/make';
import {NavProps} from './types';

export const NavItem = ({text, path}: NavProps) => {
  const {lang} = useI18n();

  return (
    <LinkContainer to={makeSimplePath(path, {lang})}>
      <Nav.Link>
        {text}
      </Nav.Link>
    </LinkContainer>
  );
};

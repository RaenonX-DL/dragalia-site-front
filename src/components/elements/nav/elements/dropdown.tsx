import React from 'react';

import {NavDropdown} from 'react-bootstrap';
import {useLocation} from 'react-router-dom';

import {getNeutralPathFromUrl} from '../../../../utils/path/utils';
import {NavDropdownItem} from './dropdownItem';
import {NavDropdownEntry} from './types';

type Props = {
  title: string,
  items: Array<NavDropdownEntry>,
}

export const NavDropdownMenu = ({title, items}: Props) => {
  const location = useLocation();

  const {path: neutralPath} = getNeutralPathFromUrl(location.pathname);
  let isActive;
  if (neutralPath) {
    isActive = items
      .some((item) => {
        if (item.type !== 'item') {
          return false;
        }

        return item.path === neutralPath;
      });
  } else {
    isActive = false;
  }

  return (
    <NavDropdown title={title} id={title} active={isActive}>
      {
        items.map((item, idx) => {
          if (item.type === 'header') {
            return <NavDropdown.Header key={idx}>{item.text}</NavDropdown.Header>;
          }

          if (item.type === 'item') {
            return <NavDropdownItem key={idx} path={item.path} text={item.text}/>;
          }

          if (item.type === 'divider') {
            return <NavDropdown.Divider data-testid="divider" key={idx}/>;
          }
        })
      }
    </NavDropdown>
  );
};

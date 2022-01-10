import React from 'react';

import NavDropdown from 'react-bootstrap/NavDropdown';

import {useNextRouter} from '../../../utils/router';
import {NavDropdownItem} from './dropdownItem';
import {NavDropdownEntry} from './types';


type Props = {
  title: string,
  items: Array<NavDropdownEntry>,
};

export const NavDropdownMenu = ({title, items}: Props) => {
  const {pathnameNoLang} = useNextRouter();

  return (
    <NavDropdown
      id={title}
      title={title}
      active={items.some((item) => item.type === 'item' && item.path === pathnameNoLang)}
      menuVariant="dark"
    >
      {items.map((item, idx) => {
        if (item.type === 'header') {
          return <NavDropdown.Header key={idx}>{item.text}</NavDropdown.Header>;
        }

        if (item.type === 'item') {
          return <NavDropdownItem key={idx} path={item.path} text={item.text}/>;
        }

        if (item.type === 'divider') {
          return <NavDropdown.Divider data-testid="divider" key={idx}/>;
        }
      })}
    </NavDropdown>
  );
};

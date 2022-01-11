import React from 'react';

import Collapse from 'react-bootstrap/Collapse';
import Nav from 'react-bootstrap/Nav';

import {useI18n} from '../../../i18n/hook';
import {IconCollapse} from '../../elements/common/icons';
import styles from '../main.module.css';
import {NavItemDropdown} from '../type';
import {NavDropdownContainable} from './dropdownContainable';


type Props = NavItemDropdown;

export const NavDropdownMenu = ({text, pathnameNoLang, entries, renderTitle}: Props) => {
  const {t} = useI18n();
  const [open, setOpen] = React.useState(false);

  const isAnyPathActive = entries.some((entry) => (
    entry.type === 'path' && entry.path === pathnameNoLang
  ));

  return (
    <>
      {
        renderTitle ?
          renderTitle({open, setOpen, isAnyPathActive}) :
          <Nav.Link
            title={t(text)}
            onClick={() => setOpen(!open)}
            className={`${isAnyPathActive ? styles.active : ''} ${open ? styles['nav-dropdown-hover'] : ''}`}
            data-test-is-active={isAnyPathActive}
          >
            <IconCollapse/>&nbsp;{t(text)}
          </Nav.Link>
      }
      <Collapse in={open} className="mb-2">
        <div className={styles['nav-dropdown-menu']}>
          <div className={styles['nav-dropdown-menu-inner']}>
            {entries.map((entry, idx) => (
              <NavDropdownContainable key={idx} pathnameNoLang={pathnameNoLang} {...entry}/>
            ))}
          </div>
        </div>
      </Collapse>
    </>
  );
};

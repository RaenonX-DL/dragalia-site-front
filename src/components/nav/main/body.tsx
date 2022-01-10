import React from 'react';

import Nav from 'react-bootstrap/Nav';

import {GeneralPath} from '../../../const/path/definitions';
import {useI18n} from '../../../i18n/hook';
import {makeGeneralUrl} from '../../../utils/path/make';
import {useNextRouter} from '../../../utils/router';
import {navItems} from '../const';
import {NavComponent} from '../elements/component';
import {NavDropdownMenu} from '../elements/dropdown';
import {NavDropdownContainable} from '../elements/dropdownContainable';
import styles from '../main.module.css';


export const NavigationBody = () => {
  const {t, lang} = useI18n();
  const {pathnameNoLang} = useNextRouter();

  return (
    <Nav className={styles['nav-body']}>
      <Nav.Link
        href={makeGeneralUrl(GeneralPath.HOME, {lang})}
        className={pathnameNoLang === GeneralPath.HOME ? styles.active : ''}
      >
        {t((t) => t.meta.inUse.home.title)}
      </Nav.Link>
      {navItems.map((navItem, idx) => {
        const {type} = navItem;

        if (type === 'header' || type === 'path' || type === 'divider' || type === 'text') {
          return <NavDropdownContainable key={idx} pathnameNoLang={pathnameNoLang} {...navItem}/>;
        }
        if (type === 'dropdown') {
          return <NavDropdownMenu key={idx} pathnameNoLang={pathnameNoLang} {...navItem}/>;
        }
        if (type === 'component') {
          return <NavComponent key={idx} pathnameNoLang={pathnameNoLang} {...navItem}/>;
        }
      })}
    </Nav>
  );
};

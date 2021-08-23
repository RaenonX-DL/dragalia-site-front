import React from 'react';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import {GeneralPath} from '../../const/path/definitions';
import {AppReactContext} from '../../context/app/main';
import {useI18n} from '../../i18n/hook';
import {LanguageSwitch} from '../../i18n/switch';
import {Link} from '../elements/common/link';
import {UserControlButton} from '../elements/common/userControl/button/main';
import {TITLE_NAV_HTML_ID} from './const';
import {NavItem} from './elements/item';
import {NavDropdownGameData} from './gameData';
import {NavDropdownTierNote} from './tier';
import {NavDropdownUtils} from './utils';


export const Navigation = () => {
  const {t, lang} = useI18n();
  const context = React.useContext(AppReactContext);

  return (
    <>
      <Navbar collapseOnSelect expand="xl" variant="dark" style={{zIndex: 1000}}>
        <Link href={GeneralPath.HOME} locale={lang} passHref>
          <Navbar.Brand>
            {t((t) => t.meta.inUse.site.title)}
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* Left part of the navbar */}
          <Nav className="mr-auto">
            <NavItem
              path={GeneralPath.SPECIAL_THANKS}
              text={t((t) => t.meta.inUse.thanks.title)}
            />
            <NavItem
              path={GeneralPath.QUEST_LIST}
              text={t((t) => t.posts.quest.titleSelf)}
            />
            <NavItem
              path={GeneralPath.INFO_LOOKUP}
              text={t((t) => t.nav.unitInfo)}
            />
            <NavDropdownTierNote/>
            <NavItem
              path={GeneralPath.MISC_LIST}
              text={t((t) => t.posts.misc.titleSelf)}
            />
            <NavDropdownGameData/>
            <NavDropdownUtils/>
            <NavItem
              path={GeneralPath.ABOUT}
              text={t((t) => t.meta.inUse.about.title)}
            />
          </Nav>
          {/* Right part of the navbar */}
          <Nav>
            <LanguageSwitch/>
            <UserControlButton/>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Navbar
        collapseOnSelect expand="lg" bg="anim-om" variant="dark"
        sticky="top" style={{zIndex: 999}} id={TITLE_NAV_HTML_ID}
      >
        <h1 style={{fontSize: '1rem', margin: 0, lineHeight: 1.5}}>
          {context?.title}
        </h1>
      </Navbar>
    </>
  );
};

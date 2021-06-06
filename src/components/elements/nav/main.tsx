import React from 'react';

import Link from 'next/link';
import {Nav, Navbar} from 'react-bootstrap';

import {GeneralPath} from '../../../const/path/definitions';
import {useI18n} from '../../../i18n/hook';
import {LanguageSwitch} from '../../../i18n/switch';
import {GoogleSigninButton} from '../common/googleSignin/main';
import {titleNavBarId} from './const';
import {NavItem} from './elements/item';
import {NavDropdownGameData} from './gameData';
import {NavDropdownUtils} from './utils';


export const Navigation = () => {
  const {t} = useI18n();

  const [title, setTitle] = React.useState(t((t) => t.meta.inUse.site.title));

  React.useEffect(() => {
    setTitle(document.title);
  }, []);

  return (
    <>
      <Navbar collapseOnSelect expand="xl" variant="dark" style={{zIndex: 1000}}>
        <Link href={GeneralPath.HOME}>
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
              path={GeneralPath.ANALYSIS_LIST}
              text={t((t) => t.posts.analysis.titleSelf)}
            />
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
            <GoogleSigninButton/>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Navbar
        collapseOnSelect expand="lg" bg="anim-om" variant="dark" sticky="top" style={{zIndex: 999}} id={titleNavBarId}>
        <h1 style={{fontSize: '1rem', margin: 0, lineHeight: 1.5}}>
          {title}
        </h1>
      </Navbar>
    </>
  );
};

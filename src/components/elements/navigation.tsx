import React from 'react';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {LinkContainer} from 'react-router-bootstrap';
import Path from '../../constants/path';

import {GoogleSigninButton} from './googleSignin';
import {LanguageSwitch} from './langSwitch';
import {titleNavBarId} from './posts/pageAnchor';


type Props = {};


export const Navigation = React.forwardRef<HTMLSpanElement, Props>((props, ref) => {
  const {t} = useTranslation();

  return (
    <>
      <Navbar collapseOnSelect expand="lg" variant="dark" style={{zIndex: 1000}}>
        <LinkContainer to={Path.HOME}>
          <Navbar.Brand>{t('pages.name.site')}</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* Left part of the navbar */}
          <Nav className="mr-auto">
            <LinkContainer to={Path.QUEST_LIST}>
              <Nav.Link>{t('posts.quest.title_self')}</Nav.Link>
            </LinkContainer>
            <LinkContainer to={Path.ANALYSIS_LIST}>
              <Nav.Link>{t('posts.analysis.title_self')}</Nav.Link>
            </LinkContainer>
            <LinkContainer to={Path.MISC_LIST}>
              <Nav.Link>{t('posts.misc.title_self')}</Nav.Link>
            </LinkContainer>
            <NavDropdown title={t('game.data.title_self')} id="collapsible-nav-dropdown">
              <NavDropdown.Header>{t('game.data.title_passive')}</NavDropdown.Header>
              <LinkContainer to={Path.CEX}>
                <NavDropdown.Item>{t('game.data.title_cex')}</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to={Path.PRINT}>
                <NavDropdown.Item>{t('game.data.title_print')}</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider/>
              <NavDropdown.Header>{t('game.data.title_active')}</NavDropdown.Header>
              <LinkContainer to={Path.SKILL_ATK}>
                <NavDropdown.Item>{t('game.data.title_skill_atk')}</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to={Path.SKILL_SUP}>
                <NavDropdown.Item>{t('game.data.title_skill_sup')}</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider/>
              <NavDropdown.Header>{t('game.data.title_others')}</NavDropdown.Header>
              <LinkContainer to={Path.STORY}>
                <NavDropdown.Item>{t('game.data.title_story')}</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <NavDropdown title={t('game.tools.title_self')} id="collapsible-nav-dropdown">
              <LinkContainer to={Path.ROTATION_CALC}>
                <NavDropdown.Item>{t('game.tools.rotation')}</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <LinkContainer to={Path.ABOUT}>
              <Nav.Link>{t('pages.name.about')}</Nav.Link>
            </LinkContainer>
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
        <span ref={ref}>{t('pages.name.site')}</span>
      </Navbar>
    </>
  );
});

Navigation.displayName = 'Navigation';

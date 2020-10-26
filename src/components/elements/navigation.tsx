import React from 'react';
import {Nav} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {LinkContainer} from 'react-router-bootstrap';

import {GoogleSigninButton} from './googleSignin';
import {LanguageSwitch} from './langSwitch';
import Path from '../../constants/path';

export const Navigation = () => {
  const {t} = useTranslation();

  return (
    <>
      <Navbar collapseOnSelect expand="lg" variant="dark" style={{zIndex: 1000}}>
        <LinkContainer to={Path.HOME}>
          <Navbar.Brand>{t('pages.name.home')}</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* Left part of the navbar */}
          <Nav className="mr-auto">
            <LinkContainer to={Path.QUEST_LIST}>
              <Nav.Link>{t('posts.quest.title_self')}</Nav.Link>
            </LinkContainer>
            <LinkContainer to={Path.NEW_OBJECT_LIST}>
              <Nav.Link>{t('posts.new_object.title_self')}</Nav.Link>
            </LinkContainer>
            <LinkContainer to={Path.MISC_LIST}>
              <Nav.Link>{t('posts.misc.title_self')}</Nav.Link>
            </LinkContainer>
            <NavDropdown title={t('game.data.title_self')} id="collapsible-nav-dropdown">
              <NavDropdown.Header>{t('game.data.passive')}</NavDropdown.Header>
              <LinkContainer to={Path.CEX}>
                <NavDropdown.Item>{t('game.data.cex')}</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to={Path.PRINT}>
                <NavDropdown.Item>{t('game.data.print')}</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider/>
              <NavDropdown.Header>{t('game.data.active')}</NavDropdown.Header>
              <LinkContainer to={Path.SKILL_ATK}>
                <NavDropdown.Item>{t('game.data.skill_atk')}</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to={Path.SKILL_SUP}>
                <NavDropdown.Item>{t('game.data.skill_sup')}</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider/>
              <NavDropdown.Header>{t('game.data.others')}</NavDropdown.Header>
              <LinkContainer to={Path.STORY}>
                <NavDropdown.Item>{t('game.data.story')}</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <NavDropdown title={t('game.tools.title_self')} id="collapsible-nav-dropdown">
              <LinkContainer to={Path.DMG_CALC}>
                <NavDropdown.Item>{t('game.tools.damage')}</NavDropdown.Item>
              </LinkContainer>
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
      <Navbar collapseOnSelect expand="lg" bg="om-gradient" variant="dark" sticky="top" style={{zIndex: 999}}>
        Dummy Title Oasis of the Maniacs AAAAA BBBBB CCCCCC
      </Navbar>
      {/* FIXME: Ability to change the title of this navbar */}
      {/* TODO: Animate the above navbar */}
    </>
  );
};

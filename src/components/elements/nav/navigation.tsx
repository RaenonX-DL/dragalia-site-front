import React from 'react';

import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import {GeneralPath, makeSimplePath} from '../../../const/path';
import {useI18n} from '../../../i18n/hook';
import {LanguageSwitch} from '../../../i18n/switch';
import {titleNavBarId} from '../common/anchor/pageAnchor';
import {GoogleSigninButton} from '../common/googleSignin/main';


type Props = {};


export const Navigation = React.forwardRef<HTMLHeadingElement, Props>((props, ref) => {
  const {t, lang} = useI18n();

  return (
    <>
      <Navbar collapseOnSelect expand="lg" variant="dark" style={{zIndex: 1000}}>
        <LinkContainer to={makeSimplePath(GeneralPath.HOME, {lang})}>
          <Navbar.Brand>{t((t) => t.pages.name.site)}</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* Left part of the navbar */}
          <Nav className="mr-auto">
            <LinkContainer to={makeSimplePath(GeneralPath.SPECIAL_THANKS, {lang})}>
              <Nav.Link>{t((t) => t.pages.name.thanks)}</Nav.Link>
            </LinkContainer>
            <LinkContainer to={makeSimplePath(GeneralPath.QUEST_LIST, {lang})}>
              <Nav.Link>{t((t) => t.posts.quest.titleSelf)}</Nav.Link>
            </LinkContainer>
            <LinkContainer to={makeSimplePath(GeneralPath.ANALYSIS_LIST, {lang})}>
              <Nav.Link>{t((t) => t.posts.analysis.titleSelf)}</Nav.Link>
            </LinkContainer>
            <LinkContainer to={makeSimplePath(GeneralPath.MISC_LIST, {lang})}>
              <Nav.Link>{t((t) => t.posts.misc.titleSelf)}</Nav.Link>
            </LinkContainer>
            <NavDropdown title={t((t) => t.game.data.titleSelf)} id="collapsible-nav-dropdown">
              <NavDropdown.Header>{t((t) => t.game.data.titlePassive)}</NavDropdown.Header>
              <LinkContainer to={makeSimplePath(GeneralPath.EX, {lang})}>
                <NavDropdown.Item>{t((t) => t.game.data.titleEx)}</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to={makeSimplePath(GeneralPath.PRINT, {lang})}>
                <NavDropdown.Item>{t((t) => t.game.data.titlePrint)}</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider/>
              <NavDropdown.Header>{t((t) => t.game.data.titleActive)}</NavDropdown.Header>
              <LinkContainer to={makeSimplePath(GeneralPath.SKILL_ATK, {lang})}>
                <NavDropdown.Item>{t((t) => t.game.data.titleSkillAtk)}</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to={makeSimplePath(GeneralPath.SKILL_SUP, {lang})}>
                <NavDropdown.Item>{t((t) => t.game.data.titleSkillSup)}</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider/>
              <NavDropdown.Header>{t((t) => t.game.data.titleOthers)}</NavDropdown.Header>
              <LinkContainer to={makeSimplePath(GeneralPath.STORY, {lang})}>
                <NavDropdown.Item>{t((t) => t.game.data.titleStory)}</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <NavDropdown title={t((t) => t.game.tools.titleSelf)} id="collapsible-nav-dropdown">
              <LinkContainer to={makeSimplePath(GeneralPath.ROTATION_CALC, {lang})}>
                <NavDropdown.Item>{t((t) => t.game.tools.rotation)}</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <LinkContainer to={makeSimplePath(GeneralPath.ABOUT, {lang})}>
              <Nav.Link>{t((t) => t.pages.name.about)}</Nav.Link>
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
        <h1 ref={ref} style={{fontSize: '1rem', margin: 0, lineHeight: 1.5}}>{t((t) => t.pages.name.site)}</h1>
      </Navbar>
    </>
  );
});

Navigation.displayName = 'Navigation';

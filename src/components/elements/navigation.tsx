import React from 'react';
import {Nav} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {LinkContainer} from 'react-router-bootstrap';

import GoogleSignin from './googleSignin';
import LanguageSwitch from './langSwitch';
import Path from '../../constants/path';

export const Navigation = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href={Path.getHome()}>OM 龍絆攻略站</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to={Path.getAbout()}>
            <Nav.Link>About</Nav.Link>
          </LinkContainer>
          <LinkContainer to={Path.getQuest(1)}>
            <Nav.Link>I-1</Nav.Link>
          </LinkContainer>
          <LinkContainer to={Path.getQuest(2)}>
            <Nav.Link>I-2</Nav.Link>
          </LinkContainer>
          <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
            <LinkContainer to={Path.getQuest(1)}>
              <NavDropdown.Item>I-1</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to={Path.getQuest(2)}>
              <NavDropdown.Item>I-2</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to={Path.getQuest(3)}>
              <NavDropdown.Item>I-3</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider/>
            <LinkContainer to={Path.getQuest(4)}>
              <NavDropdown.Item>I-4</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        </Nav>
        <Nav>
          <LanguageSwitch/>
          <GoogleSignin/>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

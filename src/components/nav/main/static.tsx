import React from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

import {AppReactContext} from '../../../context/app/main';
import {useI18n} from '../../../i18n/hook';
import {TITLE_NAV_HTML_ID} from '../const';
import styles from '../main.module.css';
import {NavigationBody} from './body';


export const NavigationStatic = () => {
  const {t} = useI18n();
  const context = React.useContext(AppReactContext);

  const [canvasShown, setCanvasShown] = React.useState(false);

  return (
    <Navbar
      variant="dark"
      sticky="top"
      className={styles['nav-static-bar']}
      id={TITLE_NAV_HTML_ID}
      expand={false}
    >
      <Container fluid>
        <h1>
          {context?.title}
        </h1>
        <Navbar.Toggle
          className={canvasShown ? styles['nav-static-menu-btn-hide'] : styles['nav-static-menu-btn-show']}
        />
        <Navbar.Offcanvas
          placement="start"
          onShow={() => setCanvasShown(true)}
          onExited={() => setCanvasShown(false)}
        >
          <Offcanvas.Header
            closeButton
            closeVariant="white"
            className={styles['nav-offcanvas-header']}
          >
            <Offcanvas.Title>
              {t((t) => t.meta.inUse.site.title)}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <NavigationBody/>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

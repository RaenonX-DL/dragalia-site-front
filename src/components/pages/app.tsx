import React from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import {useLayoutSelector} from '../../state/layout/selector';
import {Footer} from '../elements/footer';
import {Error404} from '../error/404';
import {NavigationLandscape} from '../nav/main/landscape';
import {NavigationStatic} from '../nav/main/static';
import styles from './main.module.css';
import {SiteAlert} from './siteAlert';
import {GlobalAlert} from './stateAlert';


type Props = {
  isNotFound: boolean,
  renderApp: () => React.ReactNode,
};

export const MainApp = ({isNotFound, renderApp}: Props) => {
  const {fluid, collapse} = useLayoutSelector();

  return (
    <>
      <NavigationStatic/>
      <SiteAlert/>
      {
        isNotFound ?
          <Error404/> :
          <Container fluid={fluid} className="p-3">
            <Row className={styles['layout-row']}>
              <Col
                className={
                  `${styles['layout-col-nav']} ` +
                  `${collapse ? styles['layout-col-nav-collapsed'] : styles['layout-col-nav-opened']}`
                }
              >
                <NavigationLandscape/>
              </Col>
              <Col
                className={
                  `${styles['layout-col-main']} ` +
                  `${collapse ? styles['layout-col-main-collapsed'] : styles['layout-col-main-opened']}`
                }
              >
                <GlobalAlert/>
                {renderApp()}
                <Footer/>
              </Col>
            </Row>
          </Container>
      }
    </>
  );
};

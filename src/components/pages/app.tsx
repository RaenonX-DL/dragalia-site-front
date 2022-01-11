import React from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import {ReduxProvider} from '../../state/provider';
import {Footer} from '../elements/footer';
import {Error404} from '../error/404';
import {NavigationLandscape} from '../nav/main/landscape';
import {NavigationStatic} from '../nav/main/static';
import {SiteAlert} from './siteAlert';
import {GlobalAlert} from './stateAlert';


type Props = {
  isNotFound: boolean,
  renderApp: () => React.ReactNode,
};

export const MainApp = ({isNotFound, renderApp}: Props) => {
  return (
    <ReduxProvider>
      <NavigationStatic/>
      <SiteAlert/>
      {
        isNotFound ?
          <Error404/> :
          <Container fluid className="p-3">
            <Row className="flex-nowrap">
              <Col style={{flex: '0 0 220px'}} className="d-none d-lg-block">
                <NavigationLandscape/>
              </Col>
              <Col>
                <GlobalAlert/>
                {renderApp()}
              </Col>
            </Row>
          </Container>
      }
      <Footer/>
    </ReduxProvider>
  );
};

import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Fade from 'react-bootstrap/Fade';
import Row from 'react-bootstrap/Row';

import {useI18n} from '../../../i18n/hook';
import {layoutDispatchers} from '../../../state/layout/dispatchers';
import {useLayoutSelector} from '../../../state/layout/selector';
import {useDispatch} from '../../../state/store';
import {IconCollapseToLeft, IconExpandToRight} from '../../elements/common/icons';
import styles from '../main.module.css';
import {NavigationBody} from './body';


export const NavigationLandscape = () => {
  const {t} = useI18n();
  const dispatch = useDispatch();
  const {collapse} = useLayoutSelector();
  const [collapsed, setCollapsed] = React.useState(collapse);
  const [hideNav, setHideNav] = React.useState(collapsed);

  const onHide = () => {
    const newCollapsed = !collapsed;

    if (!newCollapsed) {
      setHideNav(false);
      dispatch(layoutDispatchers.changeCollapse(false));
    }

    setCollapsed(newCollapsed);
  };

  const onShown = () => {
    setHideNav(true);
    dispatch(layoutDispatchers.changeCollapse(true));
  };

  return (
    <div className={styles['nav-container']}>
      <Row className="text-center">
        <Col>
          <Button
            variant="outline-light"
            className={styles['nav-collapse-btn']}
            onClick={onHide}
          >
            {collapsed ? <IconExpandToRight/> : <IconCollapseToLeft/>}
          </Button>
        </Col>
      </Row>
      <Fade in={!collapsed} onExited={onShown}>
        <div className={hideNav ? 'd-none' : ''} data-test-id="nav-body" data-test-hide-nav={hideNav}>
          <div className={styles['nav-title']}>
            <h5>
              {t((t) => t.meta.inUse.site.title)}
            </h5>
          </div>
          <div>
            <NavigationBody/>
          </div>
        </div>
      </Fade>
    </div>
  );
};

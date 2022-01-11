import React from 'react';

import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';

import {useI18n} from '../../../i18n/hook';
import {makeGeneralUrl} from '../../../utils/path/make';
import styles from '../main.module.css';
import {NavItemPath} from '../type';


type Props = NavItemPath;

export const NavPath = ({path, href: hrefProps, text, disabled, onClick, pathnameNoLang, activeOverride}: Props) => {
  const {t, lang} = useI18n();
  const href = !!path ? makeGeneralUrl(path, {lang}) : hrefProps;
  const i18nText = t(text);
  const isActive = activeOverride !== undefined ? activeOverride : pathnameNoLang === path;

  const props = {
    className: `${isActive ? styles.active : ''} ${styles['nav-item']}`,
    href,
    disabled,
    onClick,
  };

  return (
    <Row>
      <Col>
        <Nav.Link {...props} data-test-is-active={isActive}>
          {i18nText}
        </Nav.Link>
      </Col>
    </Row>
  );
};

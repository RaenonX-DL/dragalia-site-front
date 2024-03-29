import React from 'react';

import {useSession} from 'next-auth/react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';

import {isPagePath, makeGeneralUrl} from '../../../api-def/paths';
import {useI18n} from '../../../i18n/hook';
import styles from '../main.module.css';
import {NavItemPath} from '../type';


type Props = NavItemPath;

export const NavPath = ({
  path,
  pathActiveBasis,
  href: hrefProps,
  text,
  disabled,
  onClick,
  pathnameNoLang,
  activeOverride,
  adminOnly = false,
}: Props) => {
  const {t, lang} = useI18n();
  const {data} = useSession();
  const href = !!path ? makeGeneralUrl(path, {lang}) : hrefProps;
  const i18nText = t(text);
  const isActive = activeOverride !== undefined ?
    activeOverride :
    (
      pathnameNoLang === path ||
      (pathnameNoLang && isPagePath(pathnameNoLang) && pathActiveBasis?.includes(pathnameNoLang))
    );

  if (adminOnly && !data?.user.isAdmin) {
    return <></>;
  }

  const props = {
    className: `${isActive ? styles.active : ''} ${adminOnly ? styles['nav-item-admin'] : styles['nav-item']}`,
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

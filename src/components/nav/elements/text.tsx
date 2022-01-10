import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useI18n} from '../../../i18n/hook';
import styles from '../main.module.css';
import {NavItemText} from '../type';


type Props = NavItemText;

export const NavText = ({text}: Props) => {
  const {t} = useI18n();

  return (
    <Row>
      <Col>
        <div className={styles.text}>
          {t(text)}
        </div>
      </Col>
    </Row>
  );
};

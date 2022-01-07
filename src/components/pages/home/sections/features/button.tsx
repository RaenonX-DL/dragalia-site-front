import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import {GeneralPath} from '../../../../../const/path/definitions';
import styles from './main.module.css';


type Props = {
  path: GeneralPath,
  title: string,
};

export const FeatureButton = ({path, title}: Props) => {
  return (
    <Col md={6} lg={3} className={styles.featureOuter}>
      <Button className={styles.feature} href={path} variant="outline-light" size="lg" block>
        {title}
      </Button>
    </Col>
  );
};

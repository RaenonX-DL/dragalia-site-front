import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import {ButtonVariant} from 'react-bootstrap/types';

import {GeneralPath} from '../../../../../const/path/definitions';
import styles from './main.module.css';


type Props = {
  path: GeneralPath,
  title: string,
  variant: ButtonVariant,
};

export const FeatureButton = ({path, title, variant}: Props) => {
  return (
    <Col lg={6} className={styles.featureOuter}>
      <Button className={styles.feature} href={path} variant={variant} size="lg" block>
        {title}
      </Button>
    </Col>
  );
};

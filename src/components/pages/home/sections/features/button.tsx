import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import {ButtonVariant} from 'react-bootstrap/types';

import {GeneralPath} from '../../../../../const/path/definitions';
import {useI18n} from '../../../../../i18n/hook';
import {makeGeneralUrl} from '../../../../../utils/path/make';
import styles from './main.module.css';


type Props = {
  path: GeneralPath,
  title: string,
  variant: ButtonVariant,
};

export const FeatureButton = ({path, title, variant}: Props) => {
  const {lang} = useI18n();

  return (
    <Col lg={6} className={styles['feature-outer']}>
      <Button className={styles.feature} href={makeGeneralUrl(path, {lang})} variant={variant} size="lg">
        {title}
      </Button>
    </Col>
  );
};

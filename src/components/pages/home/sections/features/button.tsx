import React from 'react';

import Col from 'react-bootstrap/Col';
import {ButtonVariant} from 'react-bootstrap/types';

import {GeneralPath} from '../../../../../const/path/definitions';
import {useI18n} from '../../../../../i18n/hook';
import {makeGeneralUrl} from '../../../../../utils/path/make';
import {FullSizeButton} from '../../../../elements/common/button/fullSize';
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
      <FullSizeButton href={makeGeneralUrl(path, {lang})} variant={variant}>
        {title}
      </FullSizeButton>
    </Col>
  );
};

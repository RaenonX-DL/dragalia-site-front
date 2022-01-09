import React from 'react';

import Button from 'react-bootstrap/Button';

import {featureBtnColors, FeatureKey} from '../../../../../const/colors';
import styles from './main.module.css';


type Props = {
  link: string,
  text: string,
  featureKey: FeatureKey,
  onLinkClicked?: () => void,
};

export const UnitLinkButton = ({link, text, featureKey, onLinkClicked}: Props) => {
  return (
    <Button
      className={styles['unit-link']}
      size="lg"
      variant={featureBtnColors[featureKey]}
      href={link}
      onClick={onLinkClicked}
      target="_blank"
      rel="noreferrer"
    >
      {text}
    </Button>
  );
};

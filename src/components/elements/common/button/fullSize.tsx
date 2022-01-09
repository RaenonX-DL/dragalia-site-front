import React from 'react';

import Button from 'react-bootstrap/Button';
import {ButtonVariant} from 'react-bootstrap/types';

import styles from './main.module.css';


type Props = {
  href: string,
  variant: ButtonVariant,
};

export const FullSizeButton = ({href, variant, children}: React.PropsWithChildren<Props>) => {
  return (
    <Button className={styles['full-size-btn']} href={href} variant={variant} size="lg">
      {children}
    </Button>
  );
};

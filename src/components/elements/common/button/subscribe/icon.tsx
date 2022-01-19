import React from 'react';

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import {IconNotSubscribed, IconSubscribed} from '../../icons';
import styles from './main.module.css';
import {SubscribeButtonCommonProps} from './type';


type Props = SubscribeButtonCommonProps;

export const SubscribeButtonIconOnly = ({onClick, state, disabled}: Props) => {
  const {subscribed, updating} = state;

  const className =
    `${styles['subscribe-button']} ` +
    `${subscribed ? styles['subscribe-button-as-icon-enabled'] : styles['subscribe-button-as-icon-disabled']}`;

  return (
    <Button variant="outline-secondary" className={className} onClick={onClick} disabled={updating || disabled}>
      {updating ?
        <Spinner animation="border"/> :
        (subscribed ? <IconSubscribed/> : <IconNotSubscribed/>)
      }
    </Button>
  );
};

import React from 'react';

import Button from 'react-bootstrap/Button';

import {useI18n} from '../../../../../i18n/hook';
import {SubscribeButtonCommonProps} from './type';


type Props = SubscribeButtonCommonProps;

export const SubscribeButtonText = ({onClick, state, disabled}: Props) => {
  const {t} = useI18n();

  const {subscribed, updating} = state;

  return (
    <Button
      variant={subscribed ? 'outline-danger' : 'outline-warning'}
      onClick={onClick}
      disabled={updating || disabled}
    >
      {subscribed ?
        t((t) => t.misc.subscription.remove) :
        t((t) => t.misc.subscription.add)}
    </Button>
  );
};

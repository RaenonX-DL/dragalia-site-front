import React from 'react';

import {Alert} from 'react-bootstrap';

import {alertDispatchers} from '../../../state/alert/dispatchers';
import {useAlertSelector} from '../../../state/alert/selector';
import {useDispatch} from '../../../state/store';
import {Markdown} from '../markdown/main';

export const GlobalAlert = () => {
  const {show, variant, message} = useAlertSelector();

  const dispatch = useDispatch();

  if (!show) {
    return <></>;
  }

  return (
    <Alert
      variant={variant}
      onClose={() => dispatch(alertDispatchers.alertClosed())}
      dismissible
    >
      <Markdown overrideStyle={false}>
        {message}
      </Markdown>
    </Alert>
  );
};

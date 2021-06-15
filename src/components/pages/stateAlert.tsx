import React from 'react';

import {Alert} from 'react-bootstrap';

import {alertDispatchers} from '../../state/alert/dispatchers';
import {useAlertSelector} from '../../state/alert/selector';
import {useDispatch} from '../../state/store';
import {Markdown} from '../elements/markdown/main';


export const alertDuration = 5000;

export const GlobalAlert = () => {
  const {show, variant, message} = useAlertSelector();

  const dispatch = useDispatch();

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (show) {
      timeout = setTimeout(() => dispatch(alertDispatchers.alertClosed()), alertDuration);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [show]);

  if (!show) {
    return <></>;
  }

  return (
    <Alert variant={variant}>
      <Markdown overrideStyle={false}>
        {message}
      </Markdown>
    </Alert>
  );
};

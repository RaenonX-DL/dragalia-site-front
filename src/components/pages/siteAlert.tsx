import React from 'react';

import Alert from 'react-bootstrap/Alert';

import {AlertEntry} from '../../api-def/api';
import {AppReactContext} from '../../context/app/main';
import {Markdown} from '../elements/markdown/main';
import styles from './siteAlert.module.css';


export const SiteAlert = () => {
  const [alertIdx, setAlertIdx] = React.useState(0);
  const alerts = React.useContext(AppReactContext)?.alerts;

  if (!alerts?.length) {
    return <></>;
  }

  // Could be `undefined` if `alertIdx` goes out of bound
  // - This could happen if the user switch to the other language with less site alerts
  // Reference: https://github.com/RaenonX-DL/dragalia-site-front/issues/253
  const currentAlert = alerts[alertIdx] as AlertEntry | undefined;

  if (!currentAlert) {
    // Reset alert idx
    setAlertIdx(0);
    return <></>;
  }

  return (
    <div className={styles.container}>
      <Alert
        variant={currentAlert.variant || 'light'}
        className={`${styles.text} mb-0 mx-n1 py-2`}
        onAnimationIteration={() => setAlertIdx((alertIdx + 1) % alerts.length)}
      >
        <Markdown overrideStyle={false}>
          {currentAlert.message}
        </Markdown>
      </Alert>
    </div>
  );
};

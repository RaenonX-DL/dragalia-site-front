import React from 'react';

import Alert from 'react-bootstrap/Alert';

import {AppReactContext} from '../../context/app/main';
import {Markdown} from '../elements/markdown/main';
import styles from './siteAlert.module.css';


export const SiteAlert = () => {
  const [alertIdx, setAlertIdx] = React.useState(0);
  const alerts = React.useContext(AppReactContext)?.alerts;

  if (!alerts?.length) {
    return <></>;
  }

  return (
    <div className={styles.container}>
      <Alert
        variant={alerts[alertIdx].variant}
        className={`${styles.text} mb-0 mx-n1 py-2`}
        onAnimationIteration={() => setAlertIdx((alertIdx + 1) % alerts.length)}
      >
        <Markdown overrideStyle={false}>
          {alerts[alertIdx].message}
        </Markdown>
      </Alert>
    </div>
  );
};

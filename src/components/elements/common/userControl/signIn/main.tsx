import React from 'react';

import {getProviders, signIn} from 'next-auth/react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useI18n} from '../../../../../i18n/hook';
import {useNextRouter} from '../../../../../utils/router';
import {providerIcon} from './icons';
import styles from './main.module.css';


export type SignInPageProps = {
  providers: UnwrapPromise<ReturnType<typeof getProviders>>,
};

export const SignInPage = ({providers}: SignInPageProps) => {
  const {t} = useI18n();
  const {query} = useNextRouter();

  const errorCode = query.error as string;

  if (!providers) {
    return (
      <h3 className="text-danger">
        {t((t) => t.message.error.auth.noProvider)}
      </h3>
    );
  }

  return (
    <>
      {
        errorCode &&
        <Row>
          <Col>
            <Alert variant="danger">
              {t((t) => t.message.error.auth.failed, {errorCode})}
              {query.error}
            </Alert>
          </Col>
        </Row>
      }
      <Row>
        <Col>
          <div className={styles['provider-frame']}>
            {Object.values(providers).map((provider) => (
              <Button
                key={provider.name} variant="outline-light" className={styles['provider-button']}
                onClick={() => signIn(provider.id)}
              >
                {providerIcon[provider.name] || provider.name}
              </Button>
            ))}
          </div>
        </Col>
      </Row>
    </>
  );
};

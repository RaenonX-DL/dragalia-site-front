import React from 'react';

import {getProviders, signIn} from 'next-auth/client';
import Button from 'react-bootstrap/Button';

import {useI18n} from '../../../../../i18n/hook';
import {providerIcon} from './icons';
import styles from './main.module.css';


export type SignInPageProps = {
  providers: UnwrapPromise<ReturnType<typeof getProviders>>,
};

export const SignInPage = ({providers}: SignInPageProps) => {
  const {t} = useI18n();

  if (!providers) {
    return (
      <h3 className="text-danger">
        {t((t) => t.message.error.auth.noProvider)}
      </h3>
    );
  }

  return (
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
  );
};

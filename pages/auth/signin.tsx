import React from 'react';

import {GetServerSideProps} from 'next';
import {getProviders, signIn} from 'next-auth/client';
import {Button} from 'react-bootstrap';

import {useI18n} from '../../src/i18n/hook';


type SignInPageProps = {
  providers: UnwrapPromise<ReturnType<typeof getProviders>>,
}

export const getServerSideProps: GetServerSideProps<SignInPageProps> = async () => {
  return {
    props: {
      providers: await getProviders(),
    },
  };
};

const SignInPage = ({providers}: SignInPageProps) => {
  const {t} = useI18n();

  if (!providers) {
    return (
      <h3 className="text-danger">
        {t((t) => t.message.error.auth.noProvider)}
      </h3>
    );
  }

  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <Button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</Button>
        </div>
      ))}
    </>
  );
};

export default SignInPage;

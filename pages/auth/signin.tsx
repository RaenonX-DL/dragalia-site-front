import React from 'react';

import {GetServerSideProps} from 'next';
import {getProviders, getSession, signIn} from 'next-auth/client';
import {Button} from 'react-bootstrap';

import {GeneralPath} from '../../src/const/path/definitions';
import {useI18n} from '../../src/i18n/hook';


type SignInPageProps = {
  providers: UnwrapPromise<ReturnType<typeof getProviders>>,
}

export const getServerSideProps: GetServerSideProps<SignInPageProps> = async (context) => {
  const {req, res, query} = context;
  const session = await getSession({req});

  const {callbackUrl} = query;

  if (session && res && session.accessToken) {
    // Manual redirect here instead of setting `callbackUrl` in `signIn()`
    // because customized page disregards `callbackUrl`
    return {
      redirect: {
        statusCode: 302,
        destination: (callbackUrl as string) || GeneralPath.HOME,
      },
    };
  }

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

import {GetServerSideProps} from 'next';
import {getProviders, getSession} from 'next-auth/react';

import {GeneralPath} from '../../src/api-def/paths';
import {SignInPage, SignInPageProps} from '../../src/components/elements/common/userControl/signIn/main';


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

export default SignInPage;

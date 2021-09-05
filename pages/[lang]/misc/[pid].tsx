import React from 'react';

import {GetServerSideProps} from 'next';
import {getSession} from 'next-auth/client';

import {MiscPostGetResponse} from '../../../src/api-def/api';
import {MiscPostOutput} from '../../../src/components/pages/posts/misc/output/main';
import {ApiRequestSender} from '../../../src/utils/services/api/requestSender';
import {getServerSidePropsPost} from '../../../src/utils/ssr';
import Error404 from '../../404';


type MiscPageProps = {
  response: MiscPostGetResponse | null,
}

export const getServerSideProps: GetServerSideProps<MiscPageProps> = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      response: await getServerSidePropsPost(
        context,
        ApiRequestSender.miscGet,
        (pid) => Number(pid),
        session?.user?.id.toString(),
      ),
    },
  };
};

const MiscPage = ({response}: MiscPageProps) => {
  if (!response) {
    return <Error404/>;
  }

  return <MiscPostOutput post={response}/>;
};

export default MiscPage;

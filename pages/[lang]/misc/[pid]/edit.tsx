import React from 'react';

import {GetServerSideProps} from 'next';
import {getSession} from 'next-auth/client';

import {MiscPostGetResponse} from '../../../../src/api-def/api';
import {MiscEditForm} from '../../../../src/components/pages/posts/misc/form/edit';
import {ApiRequestSender} from '../../../../src/utils/services/api/requestSender';
import {getServerSidePropsPost} from '../../../../src/utils/ssr';
import Error404 from '../../../404';


type MiscEditProps = {
  response: MiscPostGetResponse | null,
}

export const getServerSideProps: GetServerSideProps<MiscEditProps> = async (context) => {
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

const MiscEdit = ({response}: MiscEditProps) => {
  if (!response) {
    return <Error404/>;
  }

  return <MiscEditForm post={response}/>;
};

export default MiscEdit;

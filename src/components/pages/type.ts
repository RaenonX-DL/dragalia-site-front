import {Session} from 'next-auth';

import {AppReactContextValue} from '../../context/app/types';


export type PageProps = AppReactContextValue & {
  session: Session | null,
  isNotFound: boolean,
};

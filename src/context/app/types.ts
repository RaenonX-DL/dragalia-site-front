import {Session} from 'next-auth';

import {PageMeta} from '../../utils/meta/types';


export type AppReactContextValue = PageMeta & {
  session: Session | null,
}

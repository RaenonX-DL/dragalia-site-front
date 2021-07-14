import {Session} from 'next-auth';

import {SimpleUnitInfo} from '../../api-def/resources';
import {PageMeta} from '../../utils/meta/types';


export type AppReactContextValue = PageMeta & {
  session: Session | null,
  simpleUnitInfo: SimpleUnitInfo,
}

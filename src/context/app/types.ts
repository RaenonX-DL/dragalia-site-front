import {Session} from 'next-auth';

import {SimpleUnitInfo, StatusEnums} from '../../api-def/resources';
import {PageMeta} from '../../utils/meta/types';


export type AppReactContextValue = PageMeta & {
  session: Session | null,
  resources: {
    afflictions: StatusEnums,
    simpleUnitInfo: SimpleUnitInfo,
  },
}

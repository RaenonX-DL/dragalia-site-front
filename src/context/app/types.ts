import {SimpleUnitInfo, StatusEnums} from '../../api-def/resources';
import {PageMeta} from '../../utils/meta/types';


export type AppReactContextValue = PageMeta & {
  resources: {
    afflictions: StatusEnums,
    simpleUnitInfo: SimpleUnitInfo,
  },
};

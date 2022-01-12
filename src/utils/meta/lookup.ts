import {PostType} from '../../api-def/api';
import {PostPath} from '../../api-def/paths';


export const pathPostType: {[path in PostPath]: PostType} = {
  [PostPath.QUEST]: PostType.QUEST,
  [PostPath.QUEST_EDIT]: PostType.QUEST,
  [PostPath.ANALYSIS]: PostType.ANALYSIS,
  [PostPath.ANALYSIS_EDIT]: PostType.ANALYSIS,
  [PostPath.MISC]: PostType.MISC,
  [PostPath.MISC_EDIT]: PostType.MISC,
};

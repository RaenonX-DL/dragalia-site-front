import {PostType} from '../../../src/api-def/api';
import {PostPath} from '../../../src/const/path/definitions';

export const pathPostType: {[path in PostPath]: PostType} = {
  [PostPath.QUEST]: PostType.QUEST,
  [PostPath.QUEST_EDIT]: PostType.QUEST,
  [PostPath.ANALYSIS]: PostType.ANALYSIS,
  [PostPath.ANALYSIS_EDIT]: PostType.ANALYSIS,
  [PostPath.MISC]: PostType.MISC,
};

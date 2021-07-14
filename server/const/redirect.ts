import {GeneralPath, PagePath} from '../../src/const/path/definitions';


export const redirectLookup: { [P in string]?: PagePath } = {
  [GeneralPath.ANALYSIS_LIST]: GeneralPath.INFO_LOOKUP,
};

import {GeneralPath, PagePath} from '../../src/api-def/paths';


export const redirectLookup: {[P in string]?: PagePath} = {
  [GeneralPath.ANALYSIS_LIST]: GeneralPath.INFO_LOOKUP,
};

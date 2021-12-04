import {UnitInfoLookupEntry} from '../../../../../../../api-def/api/info/lookup/response';
import {UnitInfoData} from '../../../../../../../api-def/resources/types/unitInfo';


export type EntryCommonProps = {
  unitInfo: UnitInfoData,
  iconOnly?: boolean,
};

export type EntryProps = EntryCommonProps & {
  analysisMeta?: UnitInfoLookupEntry,
  simplified?: boolean,
};

export type EntryPropsHasAnalysis = Omit<EntryProps, 'analysisMeta'> & {
  analysisMeta: UnitInfoLookupEntry,
};

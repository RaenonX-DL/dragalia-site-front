import {UnitInfoLookupEntry} from '../../../../../../../api-def/api';
import {UnitInfoRequireIcon} from '../../../../../../elements/gameData/unit/modal/types';


export type EntryCommonProps = {
  unitInfo: UnitInfoRequireIcon,
  iconOnly?: boolean,
};

export type EntryProps = EntryCommonProps & {
  disableSubscription: boolean,
  analysisMeta?: UnitInfoLookupEntry,
  simplified?: boolean,
};

export type EntryPropsHasAnalysis = Omit<EntryProps, 'analysisMeta'> & {
  analysisMeta: UnitInfoLookupEntry,
};

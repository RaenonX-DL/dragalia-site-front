import {ElementEnums, ExBuffParams} from '../../../../utils/services/resources/types/enums';
import {FetchStatusSimple} from '../../common/fetch';

export type SelectionData = FetchStatusSimple & {
  exBuffParams: ExBuffParams,
  elementEnums: ElementEnums,
};

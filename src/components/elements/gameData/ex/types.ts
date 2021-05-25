import {ElementEnums, ExBuffParams} from '../../../../api-def/resources';
import {FetchStatusSimple} from '../../common/fetch';

export type SelectionData = FetchStatusSimple & {
  exBuffParams: ExBuffParams,
  elementEnums: ElementEnums,
};

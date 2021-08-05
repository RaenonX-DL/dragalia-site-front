import {ElementEnums, ExBuffParams} from '../../../../api-def/resources';
import {FetchStatusSimple} from '../../../elements/common/fetch';


export type SelectionData = FetchStatusSimple & {
  exBuffParams: ExBuffParams,
  elementEnums: ElementEnums,
};

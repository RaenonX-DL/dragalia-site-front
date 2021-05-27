import {AnalysisGetResponse} from '../../../../../api-def/api';


export type SectionProps<R extends AnalysisGetResponse> = {
  analysis: R,
}

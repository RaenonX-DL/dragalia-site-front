import {CategorizedConditionEnums, ElementEnums} from '../../../../../api-def/resources';
import {InputPanelCommonProps} from '../../../input/types';
import {InputData} from './types';


export type SectionProps = InputPanelCommonProps<InputData>

export type SectionPropsCondEnums = SectionProps & {
  conditionEnums: CategorizedConditionEnums
};

export type SectionPropsElemEnums = SectionProps & {
  elementEnums: ElementEnums
};

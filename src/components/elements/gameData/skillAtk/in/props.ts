import {CategorizedConditionEnums, ElementEnums} from '../../../../../api-def/resources';
import {InputSectionBaseProps} from '../../props';
import {InputData} from './types';


export type SectionProps = InputSectionBaseProps<InputData>

export type SectionPropsCondEnums = SectionProps & {
  conditionEnums: CategorizedConditionEnums
};

export type SectionPropsElemEnums = SectionProps & {
  elementEnums: ElementEnums
};

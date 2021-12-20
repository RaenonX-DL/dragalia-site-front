import {Variant} from 'react-bootstrap/types';


export type BadgeEntry = {
  variant: Variant,
  content: string,
};

export type ConditionBadgeOptions = {
  conditionCodes: Array<number>,
};

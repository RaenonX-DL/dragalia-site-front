import {ButtonVariant} from 'react-bootstrap/types';


export type FeatureKey =
  'analysis' |
  'info' |
  'tier' |
  'story' |
  'ex' |
  'thanks';

export const featureBtnColors: Record<FeatureKey, ButtonVariant> = {
  analysis: 'outline-light',
  tier: 'outline-primary',
  info: 'outline-warning',
  story: 'outline-info',
  ex: 'outline-success',
  thanks: 'outline-orange',
};

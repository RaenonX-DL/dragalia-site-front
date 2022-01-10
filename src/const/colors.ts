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
  info: 'outline-info',
  story: 'outline-warning',
  ex: 'outline-success',
  thanks: 'outline-orange',
};

export const featureColors: Record<FeatureKey, string> = {
  analysis: 'light',
  tier: 'primary',
  info: 'info',
  story: 'warning',
  ex: 'success',
  thanks: 'orange',
};

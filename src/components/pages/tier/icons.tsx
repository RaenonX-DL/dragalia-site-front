import React from 'react';

import {KeyPointType} from '../../../api-def/api';


export const IconCompDependent = () => <i className="bi bi-people-fill"/>;

export const IconPointsStrength = () => <i className="bi bi-plus-circle text-success"/>;

export const IconPointsWeakness = () => <i className="bi bi-dash-circle text-danger"/>;

export const PointTypeIcon: { [type in KeyPointType]: React.ReactNode } = {
  strength: <IconPointsStrength/>,
  weakness: <IconPointsWeakness/>,
};

import React from 'react';

import {KeyPointType} from '../../../api-def/api';


export const IconCompDependent = () => <i className="bi bi-people-fill"/>;

const IconPointsStrength = () => <i className="bi bi-plus-circle text-success"/>;

const IconPointsWeakness = () => <i className="bi bi-dash-circle text-danger"/>;

const IconPointsTrait = () => <i className="bi bi-slash-circle text-secondary"/>;

export const PointTypeIcon: {[type in KeyPointType]: React.ReactNode} = {
  strength: <IconPointsStrength/>,
  weakness: <IconPointsWeakness/>,
  trait: <IconPointsTrait/>,
};

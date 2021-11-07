import React from 'react';

import {useKeyPointData} from '../hooks';
import {TierKeyPoints, TierKeyPointsProps} from '../out/elements/points';


type Props = Pick<TierKeyPointsProps, 'keyPointsIds'>;

export const UnitTierNoteKeyPoints = ({...props}: Props) => {
  const {keyPointData} = useKeyPointData();

  return (
    <TierKeyPoints keyPointsData={keyPointData} {...props}/>
  );
};

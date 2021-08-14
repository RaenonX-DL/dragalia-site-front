import React from 'react';

import {KeyPointData} from '../../../../api-def/api';
import {useI18n} from '../../../../i18n/hook';
import {IconPointsStrength, IconPointsWeakness} from '../icons';

type Props = {
  keyPointsIds: Array<string>,
  keyPointsData: KeyPointData,
}


export const TierKeyPoints = ({keyPointsIds, keyPointsData}: Props) => {
  const {t} = useI18n();

  const descStrength = keyPointsIds
    .filter((id) => id in keyPointsData && keyPointsData[id].type === 'strength')
    .sort()
    .map((id) => keyPointsData[id].description);

  const descWeakness = keyPointsIds
    .filter((id) => id in keyPointsData && keyPointsData[id].type === 'weakness')
    .sort()
    .map((id) => keyPointsData[id].description);

  return (
    <>
      {
        descStrength.length > 0 &&
        <div className="text-success">
          <h5>
            <IconPointsStrength/>&nbsp;
            {t((t) => t.game.unitTier.points.strength)}
          </h5>
          <ul className="mb-0">
            {descStrength.map((desc, idx) => <li key={idx}>{desc}</li>)}
          </ul>
        </div>
      }
      {descStrength.length > 0 && descWeakness.length > 0 && <div className="mb-3"/>}
      {
        descWeakness.length > 0 &&
        <div className="text-danger">
          <h5>
            <IconPointsWeakness/>&nbsp;
            {t((t) => t.game.unitTier.points.weakness)}
          </h5>
          <ul className="mb-0">
            {descWeakness.map((desc, idx) => <li key={idx}>{desc}</li>)}
          </ul>
        </div>
      }
    </>
  );
};

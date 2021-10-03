import React from 'react';

import Alert from 'react-bootstrap/Alert';

import {Dimension, DimensionKey} from '../../../../api-def/api';
import {useI18n} from '../../../../i18n/hook';
import {TimeAgo} from '../../../../utils/timeago';
import {AdsPageTop, AdsTierResultsEnd} from '../../../elements/common/ads/main';
import {Loading} from '../../../elements/common/loading';
import {TierNoteUnitAdmin} from './admin';
import {UnitTierNoteDimension} from './dimension';
import {useSingleUnitTierNoteResources} from './hook';
import {UnitTierNoteKeyPoints} from './keyPoints';


export const TierNoteUnit = () => {
  const {t} = useI18n();
  const {fetchStatus, data, unitId, isAdmin} = useSingleUnitTierNoteResources();

  if (fetchStatus === 'fetching') {
    return <Loading/>;
  } else if (!unitId) {
    return <>No Unit ID</>;
  }

  return (
    <>
      {isAdmin && <TierNoteUnitAdmin unitId={unitId}/>}
      <AdsPageTop/>
      <Alert variant="info" className="mb-2">{t((t) => t.game.unitTier.tips.main)}</Alert>
      <h4>{t((t) => t.game.unitTier.tier.title)}</h4>
      {Object.keys(Dimension).map((dimension) => (
        <UnitTierNoteDimension
          key={dimension}
          dimension={dimension as DimensionKey}
          note={data?.tier[dimension as DimensionKey]}
        />
      ))}
      <h4>{t((t) => t.game.unitTier.points.title)}</h4>
      {
        data &&
        <>
          <UnitTierNoteKeyPoints keyPointsIds={data.points}/>
          <hr/>
          <div className="section mb-3 text-right">
            {t((t) => t.misc.timestamp.lastUpdated)}
            &nbsp;<TimeAgo epoch={data.lastUpdateEpoch}/>
          </div>
        </>
      }
      <AdsTierResultsEnd/>
    </>
  );
};

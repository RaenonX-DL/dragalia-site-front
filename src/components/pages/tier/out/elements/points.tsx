import React from 'react';

import {useSession} from 'next-auth/react';
import Alert from 'react-bootstrap/Alert';

import {KeyPointData} from '../../../../../api-def/api';
import {GeneralPath} from '../../../../../api-def/paths';
import {useI18n} from '../../../../../i18n/hook';
import {AdsUnitKeyPointTop} from '../../../../elements/common/ads/main';
import {IconEdit} from '../../../../elements/common/icons';
import {InternalLink} from '../../../../elements/common/link/internal';
import {pointTypeWrapperClassName} from '../../const';
import {PointTypeIcon} from '../../icons';
import styles from '../../main.module.css';
import {categorizeKeyPoints} from '../../utils';
import {CategorizedPointEntries} from '../types';
import {KeyPointListItem} from './pointItem';


export type TierKeyPointsProps = {
  keyPointsIds: Array<string>,
  keyPointsData: KeyPointData,
};

export const TierKeyPoints = ({keyPointsIds, keyPointsData}: TierKeyPointsProps) => {
  const {t, lang} = useI18n();
  const {data} = useSession();

  const pointListItems: Array<CategorizedPointEntries> = categorizeKeyPoints(keyPointsData, keyPointsIds)
    .map(({type, entries}) => ({
      type,
      entries: entries.map((entry) => ({id: entry.id, content: entry.description})),
    }));

  return (
    <>
      <AdsUnitKeyPointTop/>
      <Alert variant="info">
        {t((t) => t.game.unitTier.points.tipsOnClick)}
      </Alert>
      {pointListItems.map(({type, entries}) => {
        if (!entries.length) {
          return <React.Fragment key={type}/>;
        }

        return (
          <div className={`${pointTypeWrapperClassName[type]} mb-3`} key={type}>
            <h5>
              {PointTypeIcon[type]}&nbsp;
              {t((t) => t.game.unitTier.points.type[type])}
            </h5>
            <ul className="mb-0">
              {entries.map((entry, idx) => <KeyPointListItem key={idx} {...entry}/>)}
            </ul>
          </div>
        );
      })}
      {
        data?.user.isAdmin &&
        <div className="text-end">
          <InternalLink
            className={styles['edit-icon']}
            href={GeneralPath.TIER_POINTS_EDIT}
            locale={lang}
            content={<IconEdit/>}
          />
        </div>
      }
    </>
  );
};

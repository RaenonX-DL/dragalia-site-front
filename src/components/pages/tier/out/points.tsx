import React from 'react';

import Alert from 'react-bootstrap/Alert';

import {KeyPointData, KeyPointType, KeyPointTypeEnum} from '../../../../api-def/api';
import {GeneralPath} from '../../../../const/path/definitions';
import {AppReactContext} from '../../../../context/app/main';
import {useI18n} from '../../../../i18n/hook';
import {IconEdit} from '../../../elements/common/icons';
import {pointTypeWrapperClassName} from '../const';
import {PointTypeIcon} from '../icons';
import styles from '../main.module.css';
import {KeyPointListItem} from './pointItem';
import {PointListItemEntry} from './types';


type Props = {
  keyPointsIds: Array<string>,
  keyPointsData: KeyPointData,
}

export const TierKeyPoints = ({keyPointsIds, keyPointsData}: Props) => {
  const {t} = useI18n();
  const context = React.useContext(AppReactContext);

  const pointListItems: Array<[KeyPointType, Array<PointListItemEntry>]> = Object.keys(KeyPointTypeEnum)
    .map((key) => {
      const type = key as KeyPointType;
      const listItem: Array<PointListItemEntry> = keyPointsIds
        .filter((id) => id in keyPointsData && keyPointsData[id].type === type)
        .sort()
        .map((id) => ({id, content: keyPointsData[id].description}));

      return [type, listItem];
    });

  return (
    <>
      <Alert variant="info">
        {t((t) => t.game.unitTier.points.tipsOnClick)}
      </Alert>
      {pointListItems.map(([type, listItemData]) => {
        if (!listItemData.length) {
          return <React.Fragment key={type}/>;
        }

        return (
          <div className={`${pointTypeWrapperClassName[type]} mb-3`} key={type}>
            <h5>
              {PointTypeIcon[type]}&nbsp;
              {t((t) => t.game.unitTier.points.type[type])}
            </h5>
            <ul className="mb-0">
              {listItemData.map((point, idx) => <KeyPointListItem key={idx} {...point}/>)}
            </ul>
          </div>
        );
      })}
      {
        context?.session?.user.isAdmin &&
        <>
          <hr className="my-2"/>
          <div className="text-right">
            <a className={styles.editIcon} href={GeneralPath.TIER_POINTS_EDIT}>
              <IconEdit/>
            </a>
          </div>
        </>
      }
    </>
  );
};

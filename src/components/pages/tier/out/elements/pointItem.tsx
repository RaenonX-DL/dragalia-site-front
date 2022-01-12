import React from 'react';

import {DataPath, makeDataUrl} from '../../../../../api-def/paths';
import {useI18n} from '../../../../../i18n/hook';
import {IconInfo} from '../../../../elements/common/icons';
import styles from '../../main.module.css';
import {PointListItemEntry} from '../types';


type Props = PointListItemEntry;

export const KeyPointListItem = ({content, id}: Props) => {
  const {lang} = useI18n();

  return (
    <li>
      <div className="text-end">
        <span className="float-start">{content}</span>
        <a
          className={styles['point-info']} href={makeDataUrl(DataPath.TIER_KEY_POINT, {lang, id})}
          target="_blank" rel="noreferrer"
        >
          <IconInfo/>
        </a>
      </div>
    </li>
  );
};

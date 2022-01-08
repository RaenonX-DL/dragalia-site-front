import React from 'react';

import {KeyPointType} from '../../../../api-def/api';
import {PointTypeIcon as PointTypeIconLookup} from '../icons';
import styles from '../main.module.css';


type Props = {
  type: KeyPointType,
};

export const PointTypeIcon = ({type}: Props) => (
  <span className={styles['point-icon']}>
    {PointTypeIconLookup[type]}
  </span>
);

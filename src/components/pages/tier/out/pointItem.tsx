import React from 'react';

import {DataPath} from '../../../../const/path/definitions';
import {useI18n} from '../../../../i18n/hook';
import {makeDataUrl} from '../../../../utils/path/make';
import {IconInfo} from '../../../elements/common/icons';
import styles from '../main.module.css';


type Props = {
  content: string,
  id: string,
}

export const KeyPointListItem = ({content, id}: Props) => {
  const {lang} = useI18n();

  return (
    <li>
      <div className="text-right">
        <span className="float-left">{content}</span>
        <a
          className={styles.pointInfo} href={makeDataUrl(DataPath.TIER_KEY_POINT, {lang, id})}
          target="_blank" rel="noreferrer"
        >
          <IconInfo/>
        </a>
      </div>
    </li>
  );
};

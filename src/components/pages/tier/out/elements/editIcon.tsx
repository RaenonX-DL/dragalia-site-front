import React from 'react';

import {UnitPath} from '../../../../../const/path/definitions';
import {useI18n} from '../../../../../i18n/hook';
import {makeUnitUrl} from '../../../../../utils/path/make';
import {IconEdit} from '../../../../elements/common/icons';
import styles from '../../main.module.css';


type Props = {
  unitId: number,
}

export const TierNoteEditIcon = ({unitId}: Props) => {
  const {lang} = useI18n();

  return (
    <a className={styles.editIcon} href={makeUnitUrl(UnitPath.UNIT_TIER_EDIT, {id: unitId, lang})}>
      <IconEdit/>
    </a>
  );
};

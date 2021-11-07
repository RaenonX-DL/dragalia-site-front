import React from 'react';

import {UnitPath} from '../../../../../const/path/definitions';
import {AppReactContext} from '../../../../../context/app/main';
import {useI18n} from '../../../../../i18n/hook';
import {makeUnitUrl} from '../../../../../utils/path/make';
import {IconEdit} from '../../../../elements/common/icons';
import {InternalLink} from '../../../../elements/common/link/internal';
import styles from '../../main.module.css';


type Props = {
  unitId: number,
};

export const TierNoteEditIcon = ({unitId}: Props) => {
  const context = React.useContext(AppReactContext);
  const {lang} = useI18n();

  if (!context?.session?.user.isAdmin) {
    return <></>;
  }

  return (
    <InternalLink
      className={styles.editIcon}
      href={makeUnitUrl(UnitPath.UNIT_TIER_EDIT, {id: unitId, lang})}
      locale={lang}
      content={<IconEdit/>}
    />
  );
};

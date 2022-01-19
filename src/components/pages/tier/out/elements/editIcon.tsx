import React from 'react';

import {useSession} from 'next-auth/react';

import {makeUnitUrl, UnitPath} from '../../../../../api-def/paths';
import {useI18n} from '../../../../../i18n/hook';
import {IconEdit} from '../../../../elements/common/icons';
import {InternalLink} from '../../../../elements/common/link/internal';
import styles from '../../main.module.css';


type Props = {
  unitId: number,
};

export const TierNoteEditIcon = ({unitId}: Props) => {
  const {lang} = useI18n();
  const {data} = useSession();

  if (!data?.user.isAdmin) {
    return <></>;
  }

  return (
    <InternalLink
      className={styles['edit-icon']}
      href={makeUnitUrl(UnitPath.UNIT_TIER_EDIT, {id: unitId, lang})}
      locale={lang}
      content={<IconEdit/>}
    />
  );
};

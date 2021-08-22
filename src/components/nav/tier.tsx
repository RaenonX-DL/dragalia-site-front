import React from 'react';

import {GeneralPath} from '../../const/path/definitions';
import {useI18n} from '../../i18n/hook';
import {NavDropdownMenu} from './elements/dropdown';


export const NavDropdownTierNote = () => {
  const {t} = useI18n();

  return (
    <NavDropdownMenu
      title={t((t) => t.nav.unitTier)}
      items={[
        {
          type: 'item',
          path: GeneralPath.TIER_LOOKUP,
          text: t((t) => t.meta.inUse.tier.lookup.title),
        },
        {
          type: 'item',
          path: GeneralPath.TIER_POINTS_INDEX,
          text: t((t) => t.meta.inUse.tier.points.index.title),
        },
      ]}
    />
  );
};

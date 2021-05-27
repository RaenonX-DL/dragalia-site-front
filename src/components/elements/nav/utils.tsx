import React from 'react';

import {GeneralPath} from '../../../const/path/definitions';
import {useI18n} from '../../../i18n/hook';
import {NavDropdownMenu} from './elements/dropdown';

export const NavDropdownUtils = () => {
  const {t} = useI18n();

  return (
    <NavDropdownMenu
      title={t((t) => t.game.tools.titleSelf)}
      items={[
        {
          type: 'item',
          path: GeneralPath.ROTATION_CALC,
          text: t((t) => t.game.tools.rotation),
        },
      ]}
    />
  );
};

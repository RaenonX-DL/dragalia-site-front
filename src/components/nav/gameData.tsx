import React from 'react';

import {GeneralPath} from '../../const/path/definitions';
import {useI18n} from '../../i18n/hook';
import {NavDropdownMenu} from './elements/dropdown';


export const NavDropdownGameData = () => {
  const {t} = useI18n();

  return (
    <NavDropdownMenu
      title={t((t) => t.nav.gameData.self)}
      items={[
        {
          type: 'header',
          text: t((t) => t.nav.gameData.passive),
        },
        {
          type: 'item',
          path: GeneralPath.EX,
          text: t((t) => t.nav.gameData.ex),
        },
        {
          type: 'divider',
        },
        {
          type: 'header',
          text: t((t) => t.nav.gameData.active),
        },
        {
          type: 'item',
          path: GeneralPath.SKILL_ATK,
          text: t((t) => t.nav.gameData.skillAtk),
        },
        {
          type: 'item',
          path: GeneralPath.SKILL_SUP,
          text: t((t) => t.nav.gameData.skillSup),
        },
        {
          type: 'divider',
        },
        {
          type: 'header',
          text: t((t) => t.nav.gameData.others),
        },
        {
          type: 'item',
          path: GeneralPath.STORY,
          text: t((t) => t.nav.gameData.story),
        },
        {
          type: 'item',
          path: GeneralPath.GAME_DATAMINE_INDEX,
          text: t((t) => t.nav.gameData.datamine),
        },
      ]}
    />
  );
};

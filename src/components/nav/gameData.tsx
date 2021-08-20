import React from 'react';

import {GeneralPath} from '../../const/path/definitions';
import {useI18n} from '../../i18n/hook';
import {NavDropdownMenu} from './elements/dropdown';


export const NavDropdownGameData = () => {
  const {t} = useI18n();

  return (
    <NavDropdownMenu
      title={t((t) => t.game.data.titleSelf)}
      items={[
        {
          type: 'header',
          text: t((t) => t.game.data.titlePassive),
        },
        {
          type: 'item',
          path: GeneralPath.EX,
          text: t((t) => t.game.data.titleEx),
        },
        {
          type: 'divider',
        },
        {
          type: 'header',
          text: t((t) => t.game.data.titleActive),
        },
        {
          type: 'item',
          path: GeneralPath.SKILL_ATK,
          text: t((t) => t.game.data.titleSkillAtk),
        },
        {
          type: 'item',
          path: GeneralPath.SKILL_SUP,
          text: t((t) => t.game.data.titleSkillSup),
        },
        {
          type: 'divider',
        },
        {
          type: 'header',
          text: t((t) => t.game.data.titleOthers),
        },
        {
          type: 'item',
          path: GeneralPath.STORY,
          text: t((t) => t.game.data.titleStory),
        },
      ]}
    />
  );
};

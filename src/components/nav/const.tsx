import React from 'react';

import {DataPath, GeneralPath, PostPath, StoryPath, UnitPath} from '../../api-def/paths';
import {UserControlButton} from '../elements/common/userControl/button/main';
import {NavLanguageSwitch} from './components/switch';
import {NavItems} from './type';


export const TITLE_NAV_HTML_ID = 'nav-title'; // Global element ID for the nav bar title

export const navItems: NavItems = [
  {type: 'header', text: (t) => t.nav.header.posts},
  {type: 'path', path: GeneralPath.INFO_LOOKUP, text: (t) => t.nav.unitInfo},
  {
    type: 'path',
    path: GeneralPath.QUEST_LIST,
    text: (t) => t.posts.quest.titleSelf,
    pathActiveBasis: [PostPath.QUEST],
  },
  {
    type: 'path',
    path: GeneralPath.MISC_LIST,
    text: (t) => t.posts.misc.titleSelf,
    pathActiveBasis: [PostPath.MISC],
  },
  {type: 'header', text: (t) => t.nav.header.gameData},
  {
    type: 'dropdown',
    text: (t) => t.nav.unitTier,
    entries: [
      {
        type: 'path',
        path: GeneralPath.TIER_LOOKUP,
        pathActiveBasis: [UnitPath.UNIT_TIER],
        text: (t) => t.meta.inUse.tier.lookup.title,
      },
      {type: 'path', path: GeneralPath.TIER_POINTS_INDEX, text: (t) => t.meta.inUse.tier.points.index.title},
    ],
  },
  {
    type: 'dropdown',
    text: (t) => t.nav.gameData.self,
    entries: [
      {type: 'header', text: (t) => t.nav.gameData.passive},
      {type: 'path', path: GeneralPath.EX, text: (t) => t.nav.gameData.ex},
      {type: 'divider'},
      {type: 'header', text: (t) => t.nav.gameData.active},
      {type: 'path', path: GeneralPath.SKILL_ATK, text: (t) => t.nav.gameData.skillAtk},
      {type: 'path', path: GeneralPath.SKILL_SUP, text: (t) => t.nav.gameData.skillSup, disabled: true},
      {type: 'divider'},
      {type: 'header', text: (t) => t.nav.gameData.others},
      {
        type: 'path',
        path: GeneralPath.STORY,
        pathActiveBasis: [StoryPath.UNIT],
        text: (t) => t.nav.gameData.story,
        disabled: true,
      },
      {
        type: 'path',
        path: GeneralPath.GAME_DATAMINE_INDEX,
        text: (t) => t.nav.gameData.datamine,
        pathActiveBasis: [DataPath.GAME_DATAMINE_DETAIL],
      },
    ],
  },
  {
    type: 'dropdown',
    text: (t) => t.game.tools.titleSelf,
    entries: [
      {type: 'path', path: GeneralPath.ROTATION_CALC, text: (t) => t.game.tools.rotation, disabled: true},
      {type: 'path', path: GeneralPath.ENMITY_CALC, text: (t) => t.game.tools.enmity},
    ],
  },
  {type: 'header', text: (t) => t.nav.header.others},
  {type: 'path', path: GeneralPath.SPECIAL_THANKS, text: (t) => t.meta.inUse.thanks.title},
  {type: 'path', path: GeneralPath.ABOUT, text: (t) => t.meta.inUse.about.title},
  {
    type: 'path',
    path: GeneralPath.ADMIN_ANNOUNCEMENT,
    text: (t) => t.meta.inUse.admin.announcement.title,
    adminOnly: true,
  },
  {type: 'divider'},
  {type: 'path', path: GeneralPath.USER_SETTINGS, text: (t) => t.meta.inUse.user.settings.title},
  {type: 'component', renderComponent: () => <NavLanguageSwitch/>},
  {type: 'component', renderComponent: () => <UserControlButton/>},
];

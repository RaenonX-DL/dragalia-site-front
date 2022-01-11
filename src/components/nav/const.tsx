import React from 'react';

import {GeneralPath} from '../../const/path/definitions';
import {UserControlButton} from '../elements/common/userControl/button/main';
import {NavFluidConfig} from './components/fluid';
import {NavLanguageSwitch} from './components/switch';
import {NavItems} from './type';


export const TITLE_NAV_HTML_ID = 'nav-title'; // Global element ID for the nav bar title

export const navItems: NavItems = [
  {type: 'header', text: (t) => t.nav.header.posts},
  {type: 'path', path: GeneralPath.INFO_LOOKUP, text: (t) => t.nav.unitInfo},
  {type: 'path', path: GeneralPath.QUEST_LIST, text: (t) => t.posts.quest.titleSelf},
  {type: 'path', path: GeneralPath.MISC_LIST, text: (t) => t.posts.misc.titleSelf},
  {type: 'header', text: (t) => t.nav.header.gameData},
  {
    type: 'dropdown',
    text: (t) => t.nav.unitTier,
    entries: [
      {type: 'path', path: GeneralPath.TIER_LOOKUP, text: (t) => t.meta.inUse.tier.lookup.title},
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
      {type: 'path', path: GeneralPath.STORY, text: (t) => t.nav.gameData.story, disabled: true},
      {type: 'path', path: GeneralPath.GAME_DATAMINE_INDEX, text: (t) => t.nav.gameData.datamine},
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
  {type: 'divider'},
  {type: 'component', renderComponent: () => <NavLanguageSwitch/>},
  {type: 'component', renderComponent: () => <NavFluidConfig/>},
  {type: 'component', renderComponent: () => <UserControlButton/>},
];

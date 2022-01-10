import React from 'react';

import {GeneralPath} from '../../const/path/definitions';
import {UserControlButton} from '../elements/common/userControl/button/main';
import {LanguageSwitch} from './components/switch';
import {NavItems} from './type';


export const TITLE_NAV_HTML_ID = 'nav-title'; // Global element ID for the nav bar title

export const navItems: NavItems = [
  {type: 'path', path: GeneralPath.SPECIAL_THANKS, text: (t) => t.meta.inUse.thanks.title, feature: 'thanks'},
  {type: 'path', path: GeneralPath.QUEST_LIST, text: (t) => t.posts.quest.titleSelf},
  {type: 'path', path: GeneralPath.INFO_LOOKUP, text: (t) => t.nav.unitInfo, feature: 'analysis'},
  {
    type: 'dropdown',
    text: (t) => t.nav.unitTier,
    entries: [
      {type: 'path', path: GeneralPath.TIER_LOOKUP, text: (t) => t.meta.inUse.tier.lookup.title, feature: 'tier'},
      {type: 'path', path: GeneralPath.TIER_POINTS_INDEX, text: (t) => t.meta.inUse.tier.points.index.title},
    ],
  },
  {type: 'path', path: GeneralPath.MISC_LIST, text: (t) => t.posts.misc.titleSelf},
  {
    type: 'dropdown',
    text: (t) => t.nav.gameData.self,
    entries: [
      {type: 'header', text: (t) => t.nav.gameData.passive},
      {type: 'path', path: GeneralPath.EX, text: (t) => t.nav.gameData.ex, feature: 'ex'},
      {type: 'divider'},
      {type: 'header', text: (t) => t.nav.gameData.active},
      {type: 'path', path: GeneralPath.SKILL_ATK, text: (t) => t.nav.gameData.skillAtk},
      {type: 'path', path: GeneralPath.SKILL_SUP, text: (t) => t.nav.gameData.skillSup},
      {type: 'divider'},
      {type: 'header', text: (t) => t.nav.gameData.others},
      {type: 'path', path: GeneralPath.STORY, text: (t) => t.nav.gameData.story, feature: 'story'},
      {type: 'path', path: GeneralPath.GAME_DATAMINE_INDEX, text: (t) => t.nav.gameData.datamine},
    ],
  },
  {
    type: 'dropdown',
    text: (t) => t.game.tools.titleSelf,
    entries: [
      {type: 'path', path: GeneralPath.ROTATION_CALC, text: (t) => t.game.tools.rotation},
      {type: 'path', path: GeneralPath.ENMITY_CALC, text: (t) => t.game.tools.enmity},
    ],
  },
  {type: 'path', path: GeneralPath.ABOUT, text: (t) => t.meta.inUse.about.title},
  {type: 'component', renderComponent: () => <LanguageSwitch/>},
  {type: 'component', renderComponent: () => <UserControlButton/>},
];

import React from 'react';

import {PublicRoute} from '../components/elements/route/public';
import {Constructing} from '../components/pages/constructing';
import {ExAbilityPage} from '../components/pages/gameData/ex';
import {AttackingSkillPage} from '../components/pages/gameData/skillAtk';
import {GeneralPath} from '../const/path/definitions';
import {PageContentProps} from './types';

export const PageContentGameData = ({updatePageTitle}: PageContentProps) => {
  return (
    <>
      <PublicRoute path={GeneralPath.EX}>
        <ExAbilityPage fnSetTitle={updatePageTitle}/>
      </PublicRoute>

      <PublicRoute path={GeneralPath.SKILL_ATK}>
        <AttackingSkillPage fnSetTitle={updatePageTitle}/>
      </PublicRoute>
      <PublicRoute path={GeneralPath.SKILL_SUP}>
        <Constructing fnSetTitle={updatePageTitle}/>
      </PublicRoute>

      <PublicRoute path={GeneralPath.STORY}>
        <Constructing fnSetTitle={updatePageTitle}/>
      </PublicRoute>
    </>
  );
};

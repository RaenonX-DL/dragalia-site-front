import {AuthPath, DataPath, GeneralPath, PagePath, PostPath, StoryPath, UnitPath} from '../../api-def/paths';
import {PageMetaTranslations} from '../../i18n/translations/definition';
import {GetTranslationFunction} from '../../i18n/types';


export const metaTransFunctions: {[path in PagePath]: GetTranslationFunction<PageMetaTranslations>} = {
  // In-production paths
  [DataPath.TIER_KEY_POINT]: (t) => t.meta.inUse.tier.points.usage,
  [DataPath.GAME_DATAMINE_DETAIL]: (t) => t.meta.inUse.gameData.datamine.detail,
  [UnitPath.UNIT_INFO]: (t) => t.meta.inUse.unit.info,
  [UnitPath.UNIT_TIER]: (t) => t.meta.inUse.tier.unit,
  [UnitPath.UNIT_TIER_EDIT]: (t) => t.meta.inUse.tier.edit,
  [PostPath.QUEST]: (t) => t.meta.inUse.post.quest.post,
  [PostPath.QUEST_EDIT]: (t) => t.meta.inUse.post.quest.edit,
  [PostPath.ANALYSIS]: (t) => t.meta.inUse.post.analysis.post,
  [PostPath.ANALYSIS_EDIT]: (t) => t.meta.inUse.post.analysis.edit,
  [PostPath.MISC]: (t) => t.meta.inUse.post.misc.post,
  [PostPath.MISC_EDIT]: (t) => t.meta.inUse.post.misc.edit,
  [StoryPath.UNIT]: (t) => t.meta.inUse.story.unit,
  [GeneralPath.HOME]: (t) => t.meta.inUse.home,
  [GeneralPath.QUEST_LIST]: (t) => t.meta.inUse.post.quest.list,
  [GeneralPath.QUEST_NEW]: (t) => t.meta.inUse.post.quest.new,
  [GeneralPath.ANALYSIS_NEW_CHARA]: (t) => t.meta.inUse.post.analysis.newChara,
  [GeneralPath.ANALYSIS_NEW_DRAGON]: (t) => t.meta.inUse.post.analysis.newDragon,
  [GeneralPath.MISC_NEW]: (t) => t.meta.inUse.post.misc.new,
  [GeneralPath.MISC_LIST]: (t) => t.meta.inUse.post.misc.list,
  [GeneralPath.TIER_LOOKUP]: (t) => t.meta.inUse.tier.lookup,
  [GeneralPath.TIER_POINTS_INDEX]: (t) => t.meta.inUse.tier.points.index,
  [GeneralPath.TIER_POINTS_EDIT]: (t) => t.meta.inUse.tier.points.edit,
  [GeneralPath.INFO_LOOKUP]: (t) => t.meta.inUse.gameData.info,
  [GeneralPath.EX]: (t) => t.meta.inUse.gameData.ex,
  [GeneralPath.SKILL_ATK]: (t) => t.meta.inUse.gameData.skillAtk,
  [GeneralPath.ABOUT]: (t) => t.meta.inUse.about,
  [GeneralPath.SPECIAL_THANKS]: (t) => t.meta.inUse.thanks,
  [GeneralPath.UPDATE_UNIT_NAME_REF]: (t) => t.meta.inUse.unit.name,
  [GeneralPath.ENMITY_CALC]: (t) => t.meta.inUse.calc.enmity,
  [GeneralPath.GAME_DATAMINE_INDEX]: (t) => t.meta.inUse.gameData.datamine.index,
  [AuthPath.SIGN_IN]: (t) => t.meta.inUse.auth.signIn,
  // Constructing paths
  [GeneralPath.SKILL_SUP]: (t) => t.meta.temp.constructing,
  [GeneralPath.STORY]: (t) => t.meta.temp.constructing,
  [GeneralPath.ROTATION_CALC]: (t) => t.meta.temp.constructing,
  [StoryPath.MAIN]: (t) => t.meta.inUse.post.misc.edit,
  [StoryPath.EVENT]: (t) => t.meta.inUse.post.misc.edit,
  // Legacy
  [GeneralPath.ANALYSIS_LIST]: (t) => t.meta.inUse.gameData.info,
};

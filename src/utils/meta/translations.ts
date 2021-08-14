import {AuthPath, GeneralPath, PagePath, PostPath, UnitPath} from '../../const/path/definitions';
import {PageMetaTranslations} from '../../i18n/translations/definition';
import {GetTranslationFunction} from '../../i18n/types';


export const metaTransFunctions: { [path in PagePath]: GetTranslationFunction<PageMetaTranslations> } = {
  // In-production paths
  [UnitPath.UNIT_INFO]: (t) => t.meta.inUse.unit.info,
  [PostPath.QUEST]: (t) => t.meta.inUse.post.quest.post,
  [PostPath.QUEST_EDIT]: (t) => t.meta.inUse.post.quest.edit,
  [PostPath.ANALYSIS]: (t) => t.meta.inUse.post.analysis.post,
  [PostPath.ANALYSIS_EDIT]: (t) => t.meta.inUse.post.analysis.edit,
  [GeneralPath.HOME]: (t) => t.meta.inUse.home,
  [GeneralPath.QUEST_LIST]: (t) => t.meta.inUse.post.quest.list,
  [GeneralPath.QUEST_NEW]: (t) => t.meta.inUse.post.quest.new,
  [GeneralPath.ANALYSIS_NEW_CHARA]: (t) => t.meta.inUse.post.analysis.newChara,
  [GeneralPath.ANALYSIS_NEW_DRAGON]: (t) => t.meta.inUse.post.analysis.newDragon,
  [GeneralPath.TIER]: (t) => t.meta.inUse.tier.index,
  [GeneralPath.TIER_EDIT]: (t) => t.meta.inUse.tier.edit,
  [GeneralPath.TIER_POINTS_EDIT]: (t) => t.meta.inUse.tier.points.edit,
  [GeneralPath.INFO_LOOKUP]: (t) => t.meta.inUse.gameData.info,
  [GeneralPath.EX]: (t) => t.meta.inUse.gameData.ex,
  [GeneralPath.SKILL_ATK]: (t) => t.meta.inUse.gameData.skillAtk,
  [GeneralPath.ABOUT]: (t) => t.meta.inUse.about,
  [GeneralPath.SPECIAL_THANKS]: (t) => t.meta.inUse.thanks,
  [GeneralPath.UPDATE_UNIT_NAME_REF]: (t) => t.meta.inUse.unit.name,
  [AuthPath.SIGN_IN]: (t) => t.meta.inUse.auth.signIn,
  // Constructing paths
  [PostPath.MISC]: (t) => t.meta.temp.constructing,
  [GeneralPath.MISC_LIST]: (t) => t.meta.temp.constructing,
  [GeneralPath.SKILL_SUP]: (t) => t.meta.temp.constructing,
  [GeneralPath.STORY]: (t) => t.meta.temp.constructing,
  [GeneralPath.ROTATION_CALC]: (t) => t.meta.temp.constructing,
  // Legacy
  [GeneralPath.ANALYSIS_LIST]: (t) => t.meta.inUse.gameData.info,
};

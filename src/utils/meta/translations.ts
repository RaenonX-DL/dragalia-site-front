import {GeneralPath, PagePath, PostPath} from '../../const/path/definitions';
import {PageMetaTranslations} from '../../i18n/translations/definition';
import {GetTranslationFunction} from '../../i18n/types';


export const metaTransFunctions: { [path in PagePath]: GetTranslationFunction<PageMetaTranslations> } = {
  // In-production paths
  [PostPath.QUEST]: (t) => t.meta.inUse.questPost,
  [PostPath.QUEST_EDIT]: (t) => t.meta.inUse.questEdit,
  [PostPath.ANALYSIS]: (t) => t.meta.inUse.analysisPost,
  [PostPath.ANALYSIS_EDIT]: (t) => t.meta.inUse.analysisEdit,
  [GeneralPath.HOME]: (t) => t.meta.inUse.home,
  [GeneralPath.QUEST_LIST]: (t) => t.meta.inUse.questList,
  [GeneralPath.QUEST_NEW]: (t) => t.meta.inUse.questNew,
  [GeneralPath.ANALYSIS_LIST]: (t) => t.meta.inUse.analysisIndex,
  [GeneralPath.ANALYSIS_NEW_CHARA]: (t) => t.meta.inUse.analysisNewChara,
  [GeneralPath.ANALYSIS_NEW_DRAGON]: (t) => t.meta.inUse.analysisNewDragon,
  [GeneralPath.EX]: (t) => t.meta.inUse.gameData.ex,
  [GeneralPath.SKILL_ATK]: (t) => t.meta.inUse.gameData.skillAtk,
  [GeneralPath.ABOUT]: (t) => t.meta.inUse.about,
  [GeneralPath.SPECIAL_THANKS]: (t) => t.meta.inUse.thanks,
  // Constructing paths
  [PostPath.MISC]: (t) => t.meta.temp.constructing,
  [GeneralPath.MISC_LIST]: (t) => t.meta.temp.constructing,
  [GeneralPath.SKILL_SUP]: (t) => t.meta.temp.constructing,
  [GeneralPath.STORY]: (t) => t.meta.temp.constructing,
  [GeneralPath.ROTATION_CALC]: (t) => t.meta.temp.constructing,
};

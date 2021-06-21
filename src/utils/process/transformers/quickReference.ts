import {PostPath} from '../../../const/path/definitions';
import {translations} from '../../../i18n/translations/main';
import {makePostPath} from '../../path/make';
import {getUnitNameIdMap} from '../../services/resources/unitInfo/utils';
import {TextTransformer} from '../type';


const transformQuestPost: TextTransformer = async ({text, lang}) => {
  const postTypeName = translations[lang].posts.quest.titleSelf;

  text = text.replace(
    /#Q(\d+)/g,
    (_, pid) => `[${postTypeName} #${pid}](${makePostPath(PostPath.QUEST, {pid, lang})})`,
  );

  return text;
};

const transformAnalysis: TextTransformer = async ({text, lang}) => {
  const unitNameIdMap = await getUnitNameIdMap(lang);

  if (!Object.keys(unitNameIdMap).length) {
    return text;
  }

  // Source: https://stackoverflow.com/a/15604206/11571888
  const regex = new RegExp(Object.keys(unitNameIdMap).join('|'), 'gi');
  text = text.replace(
    regex,
    (unitName) => {
      const unitId = unitNameIdMap[unitName];
      const postPath = makePostPath(PostPath.ANALYSIS, {pid: unitId, lang});

      return `[${unitName}](${postPath})`;
    },
  );

  return text;
};

const transformMiscellaneous: TextTransformer = async ({text, lang}) => {
  const postTypeName = translations[lang].posts.misc.titleSelf;

  text = text.replace(
    /#M(\d+)/g,
    (_, pid) => `[${postTypeName} #${pid}](${makePostPath(PostPath.MISC, {pid, lang})})`,
  );

  return text;
};

const transformers: Array<TextTransformer> = [
  transformQuestPost,
  transformAnalysis,
  transformMiscellaneous,
];

export const transformQuickReference: TextTransformer = async (payload) => {
  for (const transformer of transformers) {
    payload.text = await transformer(payload);
  }

  return payload.text;
};

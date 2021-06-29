import {PostPath} from '../../../const/path/definitions';
import {translations} from '../../../i18n/translations/main';
import {makePostPath} from '../../path/make';
import {getImageURL, getUnitNameInfoMap} from '../../services/resources/unitInfo/utils';
import {sortDescending} from '../../sort';
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
  const unitNameIdMap = await getUnitNameInfoMap(lang);

  if (!unitNameIdMap.size) {
    return text;
  }

  // Sort the keys by its length descending for greedy match
  const nameRegex = [...unitNameIdMap.keys()]
    .sort(sortDescending({getComparer: (element) => element.length}))
    .join('|');
  // Source: https://stackoverflow.com/a/15604206/11571888
  const regex = new RegExp(`([^\\[]|:|^)(${nameRegex})([^\\]]|:|$)`, 'g');
  text = text.replace(
    regex,
    (matched, leftRemainder, unitName, rightRemainder) => {
      const unitInfo = unitNameIdMap.get(unitName);
      if (!unitInfo) {
        return matched;
      }

      const postPath = makePostPath(PostPath.ANALYSIS, {pid: unitInfo.id, lang});
      const imageMd = `![${unitName}](${getImageURL(unitInfo)}|unitIcon)`;

      leftRemainder = leftRemainder.replace(/:/g, '');
      rightRemainder = rightRemainder.replace(/:/g, '');

      return `${leftRemainder || ''}${imageMd}[${unitName}](${postPath})${rightRemainder}`;
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

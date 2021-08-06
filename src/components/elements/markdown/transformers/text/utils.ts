import {SupportedLanguages} from '../../../../../api-def/api';
import {StatusEnums} from '../../../../../api-def/resources';
import {IDENTIFIER_SEPARATOR} from './icon/const';
import {makeAfflictionIconMarkdown} from './icon/utils';
import {iconSyntax} from './syntax';


type Resources = {
  afflictions?: StatusEnums['status'],
}

export const injectMarkdownToText = (lang: SupportedLanguages, text: string, resources: Resources): string => {
  // Affliction icons
  if (resources.afflictions?.length) {
    resources.afflictions.forEach((entry) => {
      text = text.replace(
        new RegExp(`(^|([^${iconSyntax.end}${IDENTIFIER_SEPARATOR} ]) ?)${entry.trans[lang]}`, 'gi'),
        `$1${makeAfflictionIconMarkdown(entry)}${entry.trans[lang]}`,
      );
    });
  }

  return text;
};

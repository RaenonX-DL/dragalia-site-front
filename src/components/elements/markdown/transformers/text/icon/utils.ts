import {EnumEntry} from '../../../../../../api-def/resources';
import {iconSyntax} from '../syntax';
import {IDENTIFIER_SEPARATOR} from './const';
import {IconType} from './types';


export const makeAfflictionIconMarkdown = (affliction: EnumEntry) => {
  return `${iconSyntax.start}${IconType.AFFLICTION}${IDENTIFIER_SEPARATOR}${affliction.name}${iconSyntax.end}`;
};

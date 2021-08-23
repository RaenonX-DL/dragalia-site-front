import React from 'react';

import {SupportedLanguages} from '../../../api-def/api';
import {urlRemoveLang} from '../../../utils/path/process';


type Props<T> = {
  locale: SupportedLanguages,
  href: string
} & ({
  // If `passHref`, children must be an element accepting `href`
  passHref: true,
  children: T extends React.ReactElement<{href: string}> ? T : never,
  text?: never,
} | {
  // If not `passHref`, children must not exist and `text` must be provided
  passHref?: false,
  children?: never,
  text: string,
})

export const Link = <T, >({locale, href, passHref, children, text}: Props<T>) => {
  href = `/${locale}${urlRemoveLang(href)}`;

  if (!passHref || !children) {
    return <a href={href}>{text}</a>;
  }

  return <>{React.cloneElement(children, {href})}</>;
};

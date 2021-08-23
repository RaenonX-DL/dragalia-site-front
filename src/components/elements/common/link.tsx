import React from 'react';

import {SupportedLanguages} from '../../../api-def/api';
import {urlRemoveLang} from '../../../utils/path/process';


type Props<T> = {
  className?: string,
} & ({
  // Provide either `href` or `onClick`
  href: string,
  locale: SupportedLanguages,
  onClick?: never,
} | {
  href?: never,
  locale?: never,
  onClick: () => void,
}) & ({
  // If `passHref`, children must be an element accepting `href`
  passHref: true,
  children: T extends React.ReactElement<{href: string, className: string}> ? T : never,
  content?: never,
} | {
  // If not `passHref`, children must not exist and `text` must be provided
  // - Setting `children` gives false-negative type checking result,
  //   therefore having another property for `<a>` content
  passHref?: false,
  children?: never,
  content: React.ReactNode,
})

export const Link = <T, >({locale, href, onClick, className, passHref, children, content}: Props<T>) => {
  if (!href) {
    return <a className={className} onClick={onClick}>{content}</a>;
  }

  href = `/${locale}${urlRemoveLang(href)}`;

  if (!passHref || !children) {
    return <a className={className} href={href}>{content}</a>;
  }

  return <>{React.cloneElement(children, {href, className})}</>;
};

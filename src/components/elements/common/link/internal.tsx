import React from 'react';

import {SupportedLanguages} from '../../../../api-def/api';
import {urlRemoveLang} from '../../../../utils/path/process';


type Props<T, A extends HTMLAnchorElement> = {
  className?: string,
} & ({
  // Provide either `href` or `onClick`
  href: string,
  locale: SupportedLanguages,
  onClick?: () => void,
} | {
  href?: never,
  locale?: never,
  onClick: () => void,
}) & ({
  // If `passHref`, children must be an element accepting `href` - `children` is used
  passHref: true,
  children: T extends React.ReactElement<{href: string, className: string}> ? T : never,
  content?: never,
  anchorProps?: never,
  style?: never,
  newWindow?: never,
} | {
  // If not `passHref`, children must not exist and `text` must be provided - `<a>` is used
  // - Setting `children` gives false-negative type checking result,
  //   therefore having another property for `<a>` content
  passHref?: false,
  children?: never,
  content: React.ReactNode,
  anchorProps?: React.AnchorHTMLAttributes<A>,
  style?: React.CSSProperties,
  newWindow?: boolean,
});

export const InternalLink = <T, A extends HTMLAnchorElement>({
  className, style, locale, href, onClick, passHref, children, content, anchorProps, newWindow,
}: Props<T, A>) => {
  let props: React.AnchorHTMLAttributes<A> = {
    ...anchorProps,
    style,
    className,
    onClick,
  };

  if (newWindow) {
    props = {
      ...props,
      target: '_blank',
      rel: 'noreferrer',
    };
  }

  if (!href) {
    return <a {...props}>{content}</a>;
  }

  href = `/${locale}${urlRemoveLang(href)}`;

  if (!passHref || !children) {
    return <a href={href} {...props}>{content}</a>;
  }

  return <>{React.cloneElement(children, {href, className: `${className} ${children.props.className}`})}</>;
};

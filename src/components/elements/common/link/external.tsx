import React from 'react';


type Props<A extends HTMLAnchorElement> = React.AnchorHTMLAttributes<A> & {
  // Having this to require `href`
  href: string,
  newWindow?: boolean,
  children: React.ReactNode,
}

export const ExternalLink = <A extends HTMLAnchorElement>({newWindow, children, ...props}: Props<A>) => {
  if (newWindow) {
    props = {
      ...props,
      target: '_blank',
      rel: 'noreferrer',
    };
  }

  return (
    <a {...props}>
      {children}
    </a>
  );
};

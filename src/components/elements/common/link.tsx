import React from 'react';

import Link from 'next/link';

import {SupportedLanguages} from '../../../api-def/api';
import {NextUrl} from '../../../utils/router';


type NextLinkProps = {
  locale?: SupportedLanguages,
  href: NextUrl,
  passHref?: boolean,
}

export const NextLink = ({locale, href, passHref, children}: React.PropsWithChildren<NextLinkProps>) => {
  return (
    <Link href={locale ? `/${locale}${href}` : href} passHref={passHref}>
      {children}
    </Link>
  );
};

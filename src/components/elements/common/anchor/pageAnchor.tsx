import React from 'react';

import Link from 'next/link';


export const titleNavBarId = 'nav-title'; // Global element ID for the nav bar title

type PageAnchorCommonProps = {
  name: string,
}

const PageAnchorCommon = ({name}: PageAnchorCommonProps) => {
  // FIXME: Anchor - Scroll and GA record?
  return (
    <Link
      href={`#${name}`}
    >
      #
    </Link>
  );
};

type PageAnchorProps = {
  name: string,
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  text: string,
  className?: string
}

export const PageAnchor = ({name, type, text, className = ''}: PageAnchorProps) => {
  // TEST: Page anchor behavior:
  //  - Scroll on click on anchor
  //  - Address bar update on click on anchor
  //  - Scroll on navigate to anchor

  const commonProps = {
    className,
    id: name,
  };

  if (type === 'h1') {
    return <h1 {...commonProps}>{text}&nbsp;<PageAnchorCommon name={name}/></h1>;
  }
  if (type === 'h2') {
    return <h2 {...commonProps}>{text}&nbsp;<PageAnchorCommon name={name}/></h2>;
  }
  if (type === 'h3') {
    return <h3 {...commonProps}>{text}&nbsp;<PageAnchorCommon name={name}/></h3>;
  }
  if (type === 'h4') {
    return <h4 {...commonProps}>{text}&nbsp;<PageAnchorCommon name={name}/></h4>;
  }
  if (type === 'h5') {
    return <h5 {...commonProps}>{text}&nbsp;<PageAnchorCommon name={name}/></h5>;
  }
  if (type === 'h6') {
    return <h6 {...commonProps}>{text}&nbsp;<PageAnchorCommon name={name}/></h6>;
  }

  throw new Error(`unknown anchor type: ${type}`);
};

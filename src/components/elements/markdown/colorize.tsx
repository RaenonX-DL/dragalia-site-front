import React from 'react';


/**
 * The 1st group of this regex is the color to be used on CSS.
 * The 2nd group of this regex is the text to be colorized.
 */
const regex = /\[(#[A-Fa-f0-9]{6}|[a-z]+)](.*)\[\/#]/;

export const isStringTransformable = (srcString: string) => {
  return srcString.match(regex);
};

type Props = {
  text: string
}

export const ColorizedText = ({text}: Props) => {
  const replacer = (_: string, p1: string, p2: string) => {
    return (<span style={{color: p1}}>{p2}</span>);
  };

  // @ts-ignore
  const htmlText = text.replace(regex, replacer);

  // TEMP: Test of colorizing text
  console.log(htmlText);

  return (
    // @ts-ignore
    <span dangerouslySetInnerHTML={{__html: htmlText}}/>
  );
};

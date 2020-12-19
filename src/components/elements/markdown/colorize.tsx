import React from 'react';

type Props = {
  text: string
}

type States = {}

/**
 * The 1st group of this regex is the color to be used on CSS.
 * The 2nd group of this regex is the text to be colorized.
 */
const regex = /\[(#[A-Fa-f0-9]{6}|[a-z]+)](.*)\[\/#]/;

/**
 * Colorize a section of text if possible.
 *
 * Example:
 *
 * ```
 * [#A12345]TEXT[/#]
 * ```
 *
 * will be colorized to
 *
 * ```
 * <span style="color: #A12345">TEXT</span>
 * ```
 */
export class ColorizedText extends React.Component<Props, States> {
  /**
   * Check if the source string could be transformed.
   *
   * @param {string} sourceStr string to be checked if it's transformable
   * @return {string | null} ID of the video if any
   */
  static isStringTransformable(sourceStr: string) {
    return sourceStr.match(regex);
  }

  /**
   * Render the youtube video element.
   *
   * @return {JSX} JSX of the element
   */
  render() {
    const replacer = (match, p1, p2) => {
      return (<span style={{color: p1}}>{p2}</span>);
    };

    // @ts-ignore
    console.log(this.props.text.replace(regex, replacer));

    return (
      // @ts-ignore
      <span dangerouslySetInnerHTML={{__html: this.props.text.replace(regex, replacer)}}/>
    );
  }
}

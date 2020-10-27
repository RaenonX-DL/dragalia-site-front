import React from 'react';

// import {ColorizedText} from './colorize';
import {ImageInHTML} from './image';
import {EmbeddedYoutubeVideo} from './youtube';

/**
 * Object converter to convert markdown nodes.
 */
class RenderConverters {
  /**
   * Process a link to be its best-fit element.
   *
   * The link element will be processed in the following order:
   *
   * - Youtube Embed
   *
   * - Image
   *
   * If none of the above match, return the original element.
   *
   * @param {HTMLLinkElement} o object of a <a> node
   * @return {JSX} JSX of the processed element
   */
  static processLink(o: HTMLLinkElement) {
    const videoId = EmbeddedYoutubeVideo.extractVideoId(o.href);
    if (videoId) {
      // OPTIMIZE: this returns a <div>, but for every line in Markdown, it's a <p>.
      //  This fails the DOM nesting check, although it seems that it does not significant impact
      return (<EmbeddedYoutubeVideo videoId={videoId}/>);
    }

    if (ImageInHTML.isImage(o.href)) {
      return (<ImageInHTML imageUrl={o.href} alt="image"/>);
    }

    return <a href={o.href}>{o.children}</a>;
  }

  // /**
  //  * Process a text to be its best-fit element.
  //  *
  //  * The text element will be processed in the following order:
  //  *
  //  * - Colored text
  //  *
  //  * If none of the above match, return the original element.
  //  *
  //  * @param {{value: string}} o object of a text node
  //  * @return {JSX} JSX of the processed element
  //  */
  // static processText(o: { value: string }) {
  //   if (ColorizedText.isStringTransformable(o.value)) {
  //     return (<ColorizedText text={o.value}/>);
  //   }
  //
  //   return <>{o.value}</>;
  // }
}

export const renderers = {
  // text: RenderConverters.processText,
  link: RenderConverters.processLink,
};

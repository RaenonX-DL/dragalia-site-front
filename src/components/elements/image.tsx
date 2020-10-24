import React from 'react';

type Props = {
  imageUrl: string,
  alt: string
}

type States = {}

/**
 * Image element converted from image URL.
 */
export class ImageInHTML extends React.Component<Props, States> {
  /**
   * Check if the URL is an image.
   *
   * This *DOES NOT* check if the content of the link is truly the image.
   * Instead, this only checks its suffix.
   *
   * @param {string} imageUrl URL to be checked
   * @return {boolean} if the URL is an image
   */
  static isImage(imageUrl: string): boolean {
    return imageUrl.endsWith('.jpeg') || imageUrl.endsWith('.png') || imageUrl.endsWith('.jpg');
  }

  /**
   * Render the converted image element.
   *
   * @return {JSX} element in JSX
   */
  render() {
    return <img className="mb-2" src={this.props.imageUrl} alt={this.props.alt}/>;
  }
}

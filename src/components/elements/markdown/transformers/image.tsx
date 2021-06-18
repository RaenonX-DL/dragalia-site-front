import React from 'react';


export const isImage = (imageUrl: string) => {
  return imageUrl.endsWith('.jpeg') ||
    imageUrl.endsWith('.png') ||
    imageUrl.endsWith('.jpg') ||
    imageUrl.endsWith('.gif');
};

type Props = {
  imageUrl: string,
  alt: string
}

export const ImageInHTML = ({imageUrl, alt}: Props) => {
  return <a href={imageUrl}><img className="mb-2" src={imageUrl} alt={alt}/></a>;
};

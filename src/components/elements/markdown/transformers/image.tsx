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
  return (
    <a href={imageUrl} target="_blank" rel="noreferrer">
      <img className="mb-2" src={imageUrl} alt={alt}/>
    </a>
  );
};

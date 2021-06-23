import React from 'react';

import Button from 'react-bootstrap/Button';

import {useI18n} from '../../../../i18n/hook';
import {GoogleAnalytics} from '../../../../utils/services/ga';
import {CommonModal, ModalState} from '../../common/modal';


export const isImage = (imageUrl: string) => {
  return imageUrl.endsWith('.jpeg') ||
    imageUrl.endsWith('.png') ||
    imageUrl.endsWith('.jpg') ||
    imageUrl.endsWith('.gif');
};

const Image = ({imageUrl, alt}: Props) => (
  <a href={imageUrl} target="_blank" rel="noreferrer">
    <img src={imageUrl} alt={alt}/>
  </a>
);

type Props = {
  imageUrl: string,
  alt: string
}

export const ImageInHTML = ({imageUrl, alt}: Props) => {
  const {t} = useI18n();

  const [modalState, setModalState] = React.useState<ModalState>({
    show: false,
    title: '',
    message: '',
  });

  const openGifModal = () => {
    GoogleAnalytics.showGif(imageUrl);
    setModalState({
      ...modalState,
      show: true,
      message: <Image imageUrl={imageUrl} alt={alt}/>,
    });
  };

  if (imageUrl.endsWith('.gif')) {
    return (
      <>
        <CommonModal modalState={modalState} setModalState={setModalState}/>
        <Button className="p-0" variant="link" onClick={() => openGifModal()}>
          <i className="bi bi-image"/>&nbsp;
          {t((t) => t.misc.openGif)}
        </Button>
      </>
    );
  }

  return <Image imageUrl={imageUrl} alt={alt}/>;
};

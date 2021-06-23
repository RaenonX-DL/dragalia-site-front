import React from 'react';

import Button from 'react-bootstrap/Button';

import {useI18n} from '../../../../../i18n/hook';
import {GoogleAnalytics} from '../../../../../utils/services/ga';
import {CommonModal, ModalState} from '../../../common/modal';
import {IMAGE_CLASS_SPLITTER} from './const';
import {ImageProps} from './types';
import {ImageUnit} from './unit';


export const ImageInHTML = ({src, alt}: ImageProps) => {
  const {t} = useI18n();

  const [modalState, setModalState] = React.useState<ModalState>({
    show: false,
    title: '',
    message: '',
  });

  const [actualSrc, className] = src.split(IMAGE_CLASS_SPLITTER, 2);

  const openGifModal = () => {
    GoogleAnalytics.showGif(actualSrc);
    setModalState({
      ...modalState,
      show: true,
      message: <ImageUnit src={actualSrc} alt={alt} className={className}/>,
    });
  };

  if (actualSrc.endsWith('.gif')) {
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

  return <ImageUnit src={actualSrc} alt={alt} className={className}/>;
};

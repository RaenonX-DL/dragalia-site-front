import React from 'react';

import Button from 'react-bootstrap/Button';

import {useI18n} from '../../../../../i18n/hook';
import {GoogleAnalytics} from '../../../../../utils/services/ga';
import {Image} from '../../../common/image';
import {CommonModal, ModalState} from '../../../common/modal';
import {IMAGE_REGEX} from './const';
import {ImageProps} from './types';


export const ImageInHTML = ({src, alt}: ImageProps) => {
  const {t} = useI18n();

  const [modalState, setModalState] = React.useState<ModalState>({
    show: false,
    title: '',
    message: '',
  });

  const {src: actualSrc, className} = src.match(IMAGE_REGEX)?.groups || {};

  const openGifModal = () => {
    GoogleAnalytics.showGif(actualSrc);
    setModalState({
      ...modalState,
      show: true,
      message: <Image src={actualSrc} text={alt} className={className}/>,
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

  return <Image src={actualSrc} text={alt} className={className}/>;
};

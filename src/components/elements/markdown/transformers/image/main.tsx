import React from 'react';

import Button from 'react-bootstrap/Button';

import {useI18n} from '../../../../../i18n/hook';
import {GoogleAnalytics} from '../../../../../utils/services/ga';
import {IconImage} from '../../../common/icons';
import {Image} from '../../../common/image';
import {ModalFixedContent} from '../../../common/modal/fix';
import {ModalStateFix} from '../../../common/modal/types';
import {IMAGE_REGEX} from './const';
import {ImageProps} from './types';


export const ImageInHTML = ({src, alt}: ImageProps) => {
  const {t} = useI18n();

  const [modalState, setModalState] = React.useState<ModalStateFix>({show: false, title: ''});

  const {src: actualSrc, className} = src.match(IMAGE_REGEX)?.groups || {};

  const openGifModal = () => {
    GoogleAnalytics.showGif(actualSrc);
    setModalState({...modalState, show: true});
  };

  if (actualSrc.endsWith('.gif')) {
    return (
      <>
        <ModalFixedContent state={modalState} setState={setModalState}>
          <Image src={actualSrc} text={alt} className={className}/>
        </ModalFixedContent>
        <Button className="p-0" variant="link" onClick={() => openGifModal()}>
          <IconImage/>&nbsp;
          {t((t) => t.misc.openGif)}
        </Button>
      </>
    );
  }

  return <Image src={actualSrc} text={alt} className={className}/>;
};

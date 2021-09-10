import React from 'react';

import Button from 'react-bootstrap/Button';

import {useI18n} from '../../../../../i18n/hook';
import {GoogleAnalytics} from '../../../../../utils/services/ga';
import {IconImage} from '../../../common/icons';
import {Image} from '../../../common/image';
import {ModalFixedContent} from '../../../common/modal/fix';
import {ModalStateFix} from '../../../common/modal/types';
import {IMAGE_REGEX, KEYWORD_FOR_MODAL} from './const';
import {ImageProps} from './types';


export const ImageInHTML = ({src, alt}: ImageProps) => {
  const {t} = useI18n();

  const [modalState, setModalState] = React.useState<ModalStateFix>({show: false, title: ''});

  const {src: actualSrc, className} = src.match(IMAGE_REGEX)?.groups || {};

  const openImageModal = () => {
    GoogleAnalytics.showImage(actualSrc);
    setModalState({...modalState, show: true});
  };

  if (actualSrc.endsWith('.gif') || className === KEYWORD_FOR_MODAL) {
    return (
      <>
        <ModalFixedContent state={modalState} setState={setModalState}>
          <Image src={actualSrc} text={alt}/>
        </ModalFixedContent>
        <Button className="p-0" variant="link" onClick={() => openImageModal()}>
          <IconImage/>&nbsp;
          {t((t) => t.misc.openImage)}
        </Button>
      </>
    );
  }

  return <Image src={actualSrc} text={alt} className={className}/>;
};

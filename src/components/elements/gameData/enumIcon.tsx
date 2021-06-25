import React from 'react';

import {DepotPaths, EnumEntry} from '../../../api-def/resources';
import {useI18n} from '../../../i18n/hook';
import {Image} from '../common/image';


type Props = {
  entry: EnumEntry | undefined,
}

export const EnumEntryImageIcon = ({entry}: Props) => {
  const {lang} = useI18n();

  if (!entry) {
    return <></>;
  }

  const imagePath = entry.imagePath;
  const text = entry.trans[lang];

  if (!imagePath) {
    return <>{text}</>;
  }

  return <Image src={DepotPaths.getImageURL(imagePath)} text={text} style={{height: '1.3rem'}}/>;
};

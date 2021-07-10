import React from 'react';

import {DepotPaths, EnumEntry} from '../../../api-def/resources';
import {useI18n} from '../../../i18n/hook';
import {CheckItemImageOptions} from '../common/check/types';
import {Image} from '../common/image';


type Props = Pick<CheckItemImageOptions, 'height'> & {
  entry: EnumEntry | undefined,
}

export const EnumEntryImageIcon = ({entry, height}: Props) => {
  const {lang} = useI18n();

  if (!entry) {
    return <></>;
  }

  const imagePath = entry.imagePath;
  const text = entry.trans[lang];

  if (!imagePath) {
    return <>{text}</>;
  }

  return <Image src={DepotPaths.getImageURL(imagePath)} text={text} style={{height: height || '1.3rem'}}/>;
};

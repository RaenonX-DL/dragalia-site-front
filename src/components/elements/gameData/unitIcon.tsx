import React from 'react';

import {UnitInfoData} from '../../../api-def/resources/types';
import {useI18n} from '../../../i18n/hook';
import {Image} from '../common/image';
import {getImageURL} from '../posts/analysis/lookup/utils';


type UnitIconProps = {
  unitInfo: UnitInfoData
  className?: string,
  style?: React.CSSProperties,
}

export const UnitIcon = ({unitInfo, className, style}: UnitIconProps) => {
  const {lang} = useI18n();

  return (
    <Image
      src={getImageURL(unitInfo)}
      text={unitInfo.name[lang]}
      className={className}
      style={style}
    />
  );
};

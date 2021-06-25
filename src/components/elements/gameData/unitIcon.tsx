import React from 'react';

import {UnitInfoData} from '../../../api-def/resources/types';
import {useI18n} from '../../../i18n/hook';
import {getImageURL} from '../../../utils/services/resources/unitInfo/utils';
import {ImageWithOverlay} from '../common/image';


type UnitIconProps = {
  unitInfo: UnitInfoData
  className?: string,
  style?: React.CSSProperties,
}

export const UnitIcon = ({unitInfo, className, style}: UnitIconProps) => {
  const {lang} = useI18n();

  return (
    <ImageWithOverlay
      src={getImageURL(unitInfo)}
      text={unitInfo.name[lang]}
      className={className}
      style={style}
    />
  );
};

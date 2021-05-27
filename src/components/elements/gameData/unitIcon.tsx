import React from 'react';

import {UnitInfoData} from '../../../api-def/resources/types';
import {useI18n} from '../../../i18n/hook';
import {getImageURL} from '../posts/analysis/lookup/utils';

type UnitIconProps = {
  unitInfo: UnitInfoData
  className?: string,
  style?: React.CSSProperties,
}

export const UnitIcon = ({unitInfo, className, style}: UnitIconProps) => {
  const {lang} = useI18n();

  return (
    <img
      src={getImageURL(unitInfo)}
      alt={unitInfo.name[lang]}
      className={className}
      style={style}
    />
  );
};

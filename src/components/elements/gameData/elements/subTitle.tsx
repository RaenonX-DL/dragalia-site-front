import React from 'react';

import {useTranslation} from '../../../../i18n/utils';
import {OverlayPopover} from '../../common/overlay/popover';
import {DetailedProps} from './types';

export const SectionSubTitle = ({titleLabel, descriptionLabel}: DetailedProps) => {
  const {t} = useTranslation();

  return (
    <OverlayPopover title={t(titleLabel)} content={t(descriptionLabel)}>
      <h5 className="mb-3">{t(titleLabel)}</h5>
    </OverlayPopover>
  );
};

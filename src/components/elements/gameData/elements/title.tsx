import React from 'react';

import {useTranslation} from '../../../../i18n/utils';
import {OverlayPopover} from '../../common/overlay/popover';
import {DetailedProps} from './types';

export const SectionTitle = ({titleLabel, descriptionLabel}: DetailedProps) => {
  const {t} = useTranslation();

  return (
    <OverlayPopover title={t(titleLabel)} content={t(descriptionLabel)}>
      <h4 className="mb-3">{t(titleLabel)}</h4>
    </OverlayPopover>
  );
};

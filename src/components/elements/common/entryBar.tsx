import React from 'react';

import {useI18n} from '../../../i18n/hook';
import {ButtonBar} from './buttonBar';


type Props = {
  resultCount: number,
  setResultCount: (newResultCount: number) => void,
  renderCount: number,
  maxCount: number,
};

export const SlicedEntryBar = ({resultCount, setResultCount, renderCount, maxCount}: Props) => {
  const {t} = useI18n();

  if (resultCount <= 0 || resultCount >= maxCount) {
    return <></>;
  }

  return (
    <ButtonBar
      buttons={[
        {
          text: t((t) => t.misc.showMore),
          variant: 'outline-success',
          onClick: () => setResultCount(resultCount + renderCount),
        },
        {
          text: t((t) => t.misc.showAll),
          variant: 'outline-warning',
          onClick: () => setResultCount(-1),
        },
      ]}
    />
  );
};

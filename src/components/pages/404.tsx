import React from 'react';

import {useI18n} from '../../i18n/hook';

export const Error404 = () => {
  const {t} = useI18n();

  return (
    <div className="row">
      <div className="col text-center text-danger">
        <h3>{t((t) => t.meta.error['404'].description)}</h3>
      </div>
    </div>
  );
};

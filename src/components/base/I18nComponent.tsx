import React from 'react';
import {i18n, TFunction} from 'i18next';

export type I18nProps = {
  i18n: i18n,
  t: TFunction,
  tReady: boolean,
}

/**
 * Elements that will use `i18next`.
 */
export class I18nComponent<P extends I18nProps, S> extends React.Component<P, S> {}

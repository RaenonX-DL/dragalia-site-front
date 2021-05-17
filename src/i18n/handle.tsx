import React from 'react';

import {useParams} from 'react-router-dom';

import {PathParams} from '../const/path/params';
import {useI18n} from './hook';
import {mapToSupportedLang} from './langCode';

export const LanguageHandle = () => {
  const {lang, setLang} = useI18n();

  const {lang: pathLang} = useParams<PathParams>();

  if (pathLang !== lang) {
    setLang(mapToSupportedLang(pathLang));
  }

  return <></>;
};

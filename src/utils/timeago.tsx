import React from 'react';

import TimeAgoExternal, {Formatter} from 'react-timeago';
// --- Typescript type definitions not exposing these.
// @ts-ignore
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
// @ts-ignore
import enStrings from 'react-timeago/lib/language-strings/en';
// @ts-ignore
import jpStrings from 'react-timeago/lib/language-strings/ja';
// @ts-ignore
import chtStrings from 'react-timeago/lib/language-strings/zh-TW';

import {SupportedLanguages} from '../api-def/api/other/lang';
import {useI18n} from '../i18n/hook';

const formatters: { [lang in SupportedLanguages]: Formatter } = {
  [SupportedLanguages.EN]: buildFormatter(enStrings),
  [SupportedLanguages.CHT]: buildFormatter(chtStrings),
  [SupportedLanguages.JP]: buildFormatter(jpStrings),
};

type TimeAgoProps = {
  epoch: number,
}

export const TimeAgo = ({epoch}: TimeAgoProps) => {
  const {lang} = useI18n();

  return <TimeAgoExternal date={epoch} formatter={formatters[lang]}/>;
};

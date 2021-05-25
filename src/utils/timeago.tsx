import React from 'react';

import TimeAgoExternal, {Formatter} from 'react-timeago';
// --- Typescript type definitions not exposing these.
// @ts-ignore
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
// @ts-ignore
import enStrings from 'react-timeago/lib/language-strings/en';
// @ts-ignore
import jpStrings from 'react-timeago/lib/language-strings/ja';

import {SupportedLanguages} from '../api-def/api';
import {useI18n} from '../i18n/hook';

const chtStrings = {
  prefixAgo: null,
  prefixFromNow: null,
  suffixAgo: '前',
  suffixFromNow: '後',
  seconds: '<1 分',
  minute: '約 1 分',
  minutes: '%d 分',
  hour: '約 1 小時',
  hours: '%d 小時',
  day: '約 1 天',
  days: '%d 天',
  month: '約 1 個月',
  months: '%d 個月',
  year: '約 1 年',
  years: '%d 年',
  wordSeparator: '',
};

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

import React from 'react';

import {useBeforeunload} from 'react-beforeunload';
import {Prompt as RouterPrompt} from 'react-router-dom';

import {useTranslation} from '../../../i18n/utils';


type PromptProps = {
  display?: boolean,
  text?: string,
}


export const BeforeUnloadPrompt = ({display = true, text}: PromptProps) => {
  const {t} = useTranslation();

  useBeforeunload((event) => event.preventDefault());

  return <RouterPrompt when={display} message={text || t('message.warning.page_nav')}/>;
};

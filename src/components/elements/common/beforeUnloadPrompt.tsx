import React from 'react';

import {useBeforeunload} from 'react-beforeunload';
import {Prompt as RouterPrompt} from 'react-router-dom';

import {useI18n} from '../../../i18n/hook';


type PromptProps = {
  display?: boolean,
  text?: string,
}


export const BeforeUnloadPrompt = ({display = true, text}: PromptProps) => {
  const {t} = useI18n();

  useBeforeunload((event) => event.preventDefault());

  return <RouterPrompt when={display} message={text || t((t) => t.message.warning.pageNav)}/>;
};

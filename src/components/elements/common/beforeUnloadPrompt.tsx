import React, {useEffect} from 'react';

import {Prompt as RouterPrompt} from 'react-router-dom';

import {useTranslation} from '../../../i18n/utils';


const onBeforeUnload = (e: BeforeUnloadEvent) => {
  // Cancel the event
  e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
  // Chrome requires returnValue to be set
  e.returnValue = '';
};


type PromptProps = {
  display?: boolean,
  text?: string,
}


export const BeforeUnloadPrompt = ({display = true, text}: PromptProps) => {
  const {t} = useTranslation();

  // Using event listener of `beforeunload` for close/reload
  window.addEventListener('beforeunload', onBeforeUnload);

  // FIXME: Refresh?

  useEffect(() => {
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  });

  return <RouterPrompt when={display} message={text || t('message.warning.page_nav')}/>;
};

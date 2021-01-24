import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Prompt as RouterPrompt} from 'react-router-dom';


const onBeforeUnload = (e) => {
  // Cancel the event
  e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
  // Chrome requires returnValue to be set
  e.returnValue = '';
};


type PromptProps = {
  display?: boolean,
  text?: string,
}


export const Prompt = ({display = true, text}: PromptProps) => {
  const {t} = useTranslation();

  if (!text) {
    text = t('message.warning.page_nav');
  }

  // Using event listener of `beforeunload` for close/reload
  window.addEventListener('beforeunload', onBeforeUnload);

  useEffect(() => {
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  });

  return <RouterPrompt when={display} message={text}/>;
};

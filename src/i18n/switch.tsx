import React from 'react';

import {useRouter} from 'next/router';
import {NavDropdown} from 'react-bootstrap';

import {SupportedLanguageNames, SupportedLanguages} from '../api-def/api';
import {GoogleAnalytics} from '../utils/services/ga';
import {useI18n} from './hook';


export const LanguageSwitch = () => {
  const {t, lang} = useI18n();
  const {pathname} = useRouter();

  const currentLangName = SupportedLanguageNames[lang];

  const onLangChanged = (newLang: SupportedLanguages) => () => {
    GoogleAnalytics.languageChange(lang, newLang);
  };

  return (
    <NavDropdown title={currentLangName} id="language-switch" className="pr-2">
      <NavDropdown.Header>{t((t) => t.lang.inUse)}</NavDropdown.Header>
      <NavDropdown.Item disabled>{currentLangName}</NavDropdown.Item>
      <NavDropdown.Divider/>
      {
        Object.values(SupportedLanguages).map((newLang) => (
          <NavDropdown.Item
            onClick={onLangChanged(newLang)} className={lang === newLang ? 'active' : ''}
            key={newLang} href={`/${newLang}${pathname}`}
          >
            {SupportedLanguageNames[newLang]}
          </NavDropdown.Item>
        ))
      }
    </NavDropdown>
  );
};

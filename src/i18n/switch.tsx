import React from 'react';

import Link from 'next/link';
import {NavDropdown} from 'react-bootstrap';

import {SupportedLanguageNames, SupportedLanguages} from '../api-def/api';
import {GeneralPath} from '../const/path/definitions';
import {GoogleAnalytics} from '../utils/services/ga';
import {useI18n} from './hook';


// FIXME: Check if the nav item is clickable (<Link> works)
export const LanguageSwitch = () => {
  const {t, lang} = useI18n();

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
          <Link key={newLang} href={GeneralPath.HOME} locale={newLang}>
            <NavDropdown.Item onClick={onLangChanged(newLang)}>
              {SupportedLanguageNames[newLang]}
            </NavDropdown.Item>
          </Link>
        ))
      }
    </NavDropdown>
  );
};

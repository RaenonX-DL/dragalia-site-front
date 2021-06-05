import React from 'react';

import Link from 'next/link';
import {useRouter} from 'next/router';
import {NavDropdown} from 'react-bootstrap';

import {SupportedLanguageNames, SupportedLanguages} from '../api-def/api';
import {CookiesKeys} from '../utils/cookies/keys';
import {setCookies} from '../utils/cookies/utils';
import {GoogleAnalytics} from '../utils/services/ga';
import {useI18n} from './hook';


export const LanguageSwitch = () => {
  const {t, lang} = useI18n();
  const {pathname} = useRouter();

  const currentLangName = SupportedLanguageNames[lang];

  const onLangChanged = (newLang: SupportedLanguages) => () => {
    GoogleAnalytics.languageChange(lang, newLang);
    setCookies(CookiesKeys.LANG, newLang);
  };

  return (
    <NavDropdown title={currentLangName} id="language-switch" className="pr-2">
      <NavDropdown.Header>{t((t) => t.lang.inUse)}</NavDropdown.Header>
      <NavDropdown.Item disabled>{currentLangName}</NavDropdown.Item>
      <NavDropdown.Divider/>
      {
        Object.values(SupportedLanguages).map((newLang) => (
          <Link key={newLang} href={pathname} locale={newLang} passHref>
            <NavDropdown.Item
              onClick={onLangChanged(newLang)} className={lang === newLang ? 'active' : ''}
            >
              {SupportedLanguageNames[newLang]}
            </NavDropdown.Item>
          </Link>
        ))
      }
    </NavDropdown>
  );
};

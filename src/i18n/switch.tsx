import React from 'react';

import NavDropdown from 'react-bootstrap/NavDropdown';

import {SupportedLanguageNames, SupportedLanguages} from '../api-def/api';
import {NextLink} from '../components/elements/common/link';
import {CookiesKeys} from '../utils/cookies/keys';
import {setCookies} from '../utils/cookies/utils';
import {mergePlaceholders} from '../utils/path/process';
import {useNextRouter} from '../utils/router';
import {GoogleAnalytics} from '../utils/services/ga';
import {useI18n} from './hook';


export const LanguageSwitch = () => {
  const {t, lang} = useI18n();
  const {pathnameNoLang, query} = useNextRouter();

  const currentLangName = SupportedLanguageNames[lang];
  const neutralUrl = mergePlaceholders(pathnameNoLang, query);

  const onLangChanged = (newLang: SupportedLanguages) => () => {
    GoogleAnalytics.languageChange(lang, newLang);
    setCookies(CookiesKeys.LANG, newLang);
    window.location.assign(neutralUrl); // Force refresh to load all changes
  };

  return (
    <NavDropdown title={currentLangName} id="language-switch" className="pr-2">
      <NavDropdown.Header>{t((t) => t.lang.inUse)}</NavDropdown.Header>
      <NavDropdown.Item disabled>{currentLangName}</NavDropdown.Item>
      <NavDropdown.Divider/>
      {Object.values(SupportedLanguages).map((newLang) => (
        <NextLink key={newLang} href={neutralUrl} locale={newLang} passHref>
          <NavDropdown.Item
            key={newLang}
            onClick={onLangChanged(newLang)} className={lang === newLang ? 'active' : ''}
          >
            {SupportedLanguageNames[newLang]}
          </NavDropdown.Item>
        </NextLink>
      ))}
    </NavDropdown>
  );
};

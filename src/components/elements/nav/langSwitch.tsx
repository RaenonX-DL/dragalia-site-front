import React from 'react';

import {NavDropdown} from 'react-bootstrap';
import {useLocation} from 'react-router-dom';

import {SupportedLanguageNames, SupportedLanguages} from '../../../api-def/api';
import {useTranslation} from '../../../i18n/utils';
import {GoogleAnalytics} from '../../../utils/services/ga';


export const LanguageSwitch = () => {
  const {t, i18n, lang} = useTranslation();

  const [redirected, setRedirected] = React.useState(false);

  const locations = useLocation();

  const getCurrentLanguage = (getName: boolean = true) => {
    return getName ? (SupportedLanguageNames[lang] || lang) : lang;
  };

  const changeLanguage = (newLanguage?: string) => {
    const newLang: string = newLanguage || new URLSearchParams(locations.search).get('lang') || 'dev';

    GoogleAnalytics.languageChange(lang, newLang);

    // noinspection JSIgnoredPromiseFromCall
    i18n.changeLanguage(newLang);

    setRedirected(true);
  };

  if (redirected) {
    window.location.reload();
    return <></>;
  }

  return (
    <NavDropdown title={getCurrentLanguage()} id="language-switch" className="pr-2">
      <NavDropdown.Header>{t('lang.in_use')}</NavDropdown.Header>
      <NavDropdown.Item disabled>{getCurrentLanguage()}</NavDropdown.Item>
      <NavDropdown.Divider/>
      {
        Object.values(SupportedLanguages).map((lang) => (
          <NavDropdown.Item key={lang} onClick={() => changeLanguage(lang)}>
            {SupportedLanguageNames[lang]}
          </NavDropdown.Item>
        ))
      }
    </NavDropdown>
  );
};

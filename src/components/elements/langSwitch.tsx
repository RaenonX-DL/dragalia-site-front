import React from 'react';
import {useLocation} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {NavDropdown} from 'react-bootstrap';

import {SUPPORTED_LANG, SUPPORTED_LANG_NAME} from '../../constants/lang';
import {GoogleAnalytics} from '../../constants/ga';


export const LanguageSwitch = () => {
  const {t, i18n} = useTranslation();

  const [redirected, setRedirected] = React.useState(false);

  const locations = useLocation();

  const getCurrentLanguage = (getName: boolean = true) => {
    const lang = i18n.language;

    return getName ? (SUPPORTED_LANG_NAME.get(lang) || lang) : lang;
  };

  const changeLanguage = (newLanguage?: string) => {
    const newLang: string = newLanguage || new URLSearchParams(locations.search).get('lang') || 'dev';

    GoogleAnalytics.languageChange(i18n.language, newLang);

    // noinspection JSIgnoredPromiseFromCall
    i18n.changeLanguage(newLang);

    setRedirected(true);
  };

  if (redirected) {
    // OPTIMIZE: Find a better way than refreshing the whole page - probably just re-render the page part?
    window.location.reload();
    return <></>;
  }

  return (
    <NavDropdown title={getCurrentLanguage()} id="language-switch" className="pr-2">
      <NavDropdown.Header>{t('lang.in-use')}</NavDropdown.Header>
      <NavDropdown.Item disabled>{getCurrentLanguage()}</NavDropdown.Item>
      <NavDropdown.Divider/>
      {
        SUPPORTED_LANG.map((lang) => (
          <NavDropdown.Item key={lang} onClick={() => changeLanguage(lang)}>
            {SUPPORTED_LANG_NAME.get(lang)}
          </NavDropdown.Item>
        ))
      }
    </NavDropdown>
  );
};

import React from 'react';

import {NavDropdown} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import {SupportedLanguageNames, SupportedLanguages} from '../api-def/api';
import {GeneralPath} from '../const/path/definitions';
import {makeSimplePath} from '../utils/path';
import {GoogleAnalytics} from '../utils/services/ga';
import {useI18n} from './hook';


export const LanguageSwitch = () => {
  const {t, lang, setLang} = useI18n();

  const currentLangName = SupportedLanguageNames[lang];

  const onLangChanged = (newLang: SupportedLanguages) => () => {
    GoogleAnalytics.languageChange(lang, newLang);
    setLang(newLang);
  };

  return (
    <NavDropdown title={currentLangName} id="language-switch" className="pr-2">
      <NavDropdown.Header>{t((t) => t.lang.inUse)}</NavDropdown.Header>
      <NavDropdown.Item disabled>{currentLangName}</NavDropdown.Item>
      <NavDropdown.Divider/>
      {
        Object.values(SupportedLanguages).map((newLang) => (
          <LinkContainer key={newLang} to={makeSimplePath(GeneralPath.HOME, {lang: newLang})}>
            <NavDropdown.Item onClick={onLangChanged(newLang)}>
              {SupportedLanguageNames[newLang]}
            </NavDropdown.Item>
          </LinkContainer>
        ))
      }
    </NavDropdown>
  );
};

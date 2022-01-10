import React from 'react';

import Button from 'react-bootstrap/Button';

import {SupportedLanguageNames, SupportedLanguages} from '../../../api-def/api';
import {useI18n} from '../../../i18n/hook';
import {CookiesKeys} from '../../../utils/cookies/keys';
import {setCookies} from '../../../utils/cookies/utils';
import {mergePlaceholders} from '../../../utils/path/process';
import {useNextRouter} from '../../../utils/router';
import {GoogleAnalytics} from '../../../utils/services/ga';
import {NavDropdownMenu} from '../elements/dropdown';
import {NavItemDropdownContainable} from '../type';


export const LanguageSwitch = () => {
  const {lang} = useI18n();
  const {pathnameNoLang, query} = useNextRouter();

  const currentLangName = SupportedLanguageNames[lang];
  const neutralUrl = mergePlaceholders(pathnameNoLang, query);

  const onLangChanged = (newLang: SupportedLanguages) => () => {
    GoogleAnalytics.languageChange(lang, newLang);
    setCookies(CookiesKeys.LANG, newLang);
  };

  return (
    <NavDropdownMenu
      type="dropdown"
      renderTitle={({open, setOpen}) => (
        <Button variant="dark-info" onClick={() => setOpen(!open)}>
          {currentLangName}
        </Button>
      )}
      text={() => currentLangName}
      entries={[
        {type: 'header', text: (t) => t.lang.inUse},
        {type: 'text', text: () => currentLangName},
        {type: 'divider'},
        ...Object.values(SupportedLanguages).map((lang) => ({
          type: 'path',
          text: () => SupportedLanguageNames[lang],
          onClick: onLangChanged(lang),
          href: `/${lang}${neutralUrl}`,
        } as NavItemDropdownContainable)),
      ]}
    />
  );
};

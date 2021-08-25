import React from 'react';

import {fireEvent, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../test/render/main';
import {SupportedLanguageNames, SupportedLanguages} from '../api-def/api';
import {GeneralPath, PostPath} from '../const/path/definitions';
import {CookiesKeys} from '../utils/cookies/keys';
import * as cookiesUtils from '../utils/cookies/utils';
import {makePostUrl} from '../utils/path/make';
import {mergePlaceholders} from '../utils/path/process';
import {GoogleAnalytics} from '../utils/services/ga';
import * as i18nHook from './hook';
import {LanguageSwitch} from './switch';


describe('Language Switch', () => {
  let gaLangChange: jest.SpyInstance;
  let setCookies: jest.SpyInstance;

  beforeEach(() => {
    gaLangChange = jest.spyOn(GoogleAnalytics, 'languageChange');
    setCookies = jest.spyOn(cookiesUtils, 'setCookies');
    jest.spyOn(i18nHook, 'useI18n')
      .mockReturnValue({t: () => 'trans', lang: SupportedLanguages.EN});
  });

  it('shows the current language', async () => {
    renderReact(() => <LanguageSwitch/>);

    expect(screen.getByText(SupportedLanguageNames[SupportedLanguages.EN])).toBeInTheDocument();
  });

  it('shows the current language 2', async () => {
    jest.spyOn(i18nHook, 'useI18n')
      .mockReturnValue({t: () => 'trans', lang: SupportedLanguages.CHT});
    renderReact(
      () => <LanguageSwitch/>,
      {
        routerOptions: {
          locale: SupportedLanguages.CHT,
        },
      },
    );

    expect(screen.getByText(SupportedLanguageNames[SupportedLanguages.CHT])).toBeInTheDocument();
  });

  it('shows the active language', async () => {
    renderReact(() => <LanguageSwitch/>);

    const langSwitch = screen.getByText(SupportedLanguageNames[SupportedLanguages.EN]);
    userEvent.click(langSwitch);

    const enItems = screen.getAllByText(SupportedLanguageNames[SupportedLanguages.EN]);
    expect(enItems.length).toBe(3); // 1 already showing; 1 showing as active; 1 to be selected
    expect(screen.getByText(SupportedLanguageNames[SupportedLanguages.CHT])).toBeInTheDocument();
    expect(screen.getByText(SupportedLanguageNames[SupportedLanguages.JP])).toBeInTheDocument();
    expect(enItems[2]).toHaveClass('active');
  });

  it('redirects to the correct language page on click', async () => {
    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = {assign: jest.fn()};

    renderReact(
      () => <LanguageSwitch/>,
      {
        routerOptions: {
          pathname: GeneralPath.ABOUT,
        },
      },
    );

    const langSwitch = screen.getByText(SupportedLanguageNames[SupportedLanguages.EN]);
    userEvent.click(langSwitch);

    const destPath = `/${SupportedLanguages.CHT}${GeneralPath.ABOUT}`;

    const chtLink = screen.getByText(SupportedLanguageNames[SupportedLanguages.CHT]);
    expect(chtLink).toHaveAttribute('href', destPath);
    fireEvent.click(chtLink);
    expect(gaLangChange).toHaveBeenCalledWith(SupportedLanguages.EN, SupportedLanguages.CHT);
    expect(setCookies).toHaveBeenCalledWith(CookiesKeys.LANG, SupportedLanguages.CHT);
    expect(window.location.assign).toHaveBeenCalledWith(GeneralPath.ABOUT);
  });

  it('redirects to correct post page', async () => {
    renderReact(
      () => <LanguageSwitch/>,
      {
        routerOptions: {
          pathname: PostPath.ANALYSIS,
          query: {pid: '7'},
        },
      },
    );

    const langSwitch = screen.getByText(SupportedLanguageNames[SupportedLanguages.EN]);
    userEvent.click(langSwitch);

    const destPath = makePostUrl(PostPath.ANALYSIS, {pid: 7, lang: SupportedLanguages.CHT});

    const chtLink = screen.getByText(SupportedLanguageNames[SupportedLanguages.CHT]);
    expect(chtLink).toHaveAttribute('href', destPath);
    fireEvent.click(chtLink);
    expect(gaLangChange).toHaveBeenCalledWith(SupportedLanguages.EN, SupportedLanguages.CHT);
    expect(setCookies).toHaveBeenCalledWith(CookiesKeys.LANG, SupportedLanguages.CHT);
    expect(window.location.assign).toHaveBeenCalledWith(mergePlaceholders(PostPath.ANALYSIS, {pid: '7'}));
  });
});

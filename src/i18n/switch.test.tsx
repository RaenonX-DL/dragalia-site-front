import React from 'react';

import {fireEvent, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../test/render/main';
import {SupportedLanguageNames, SupportedLanguages} from '../api-def/api';
import {GeneralPath, PostPath} from '../const/path/definitions';
import {CookiesKeys} from '../utils/cookies/keys';
import * as cookiesUtils from '../utils/cookies/utils';
import {makePostPath} from '../utils/path/make';
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

  it('shows to current language correctly', async () => {
    renderReact(() => <LanguageSwitch/>);

    expect(screen.getByText(SupportedLanguageNames[SupportedLanguages.EN])).toBeInTheDocument();
  });

  it('shows to current language correctly 2', async () => {
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

  it('shows the languages correctly', async () => {
    renderReact(() => <LanguageSwitch/>);

    const langSwitch = screen.getByText(SupportedLanguageNames[SupportedLanguages.EN]);
    userEvent.click(langSwitch);

    const enItems = screen.getAllByText(SupportedLanguageNames[SupportedLanguages.EN]);
    expect(enItems.length).toBe(3);
    expect(screen.getByText(SupportedLanguageNames[SupportedLanguages.CHT])).toBeInTheDocument();
    expect(screen.getByText(SupportedLanguageNames[SupportedLanguages.JP])).toBeInTheDocument();
    expect(enItems[2]).toHaveClass('active');
  });

  it('redirects to the correct language page on click', async () => {
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

    const chtLink = screen.getByText(SupportedLanguageNames[SupportedLanguages.CHT]);
    expect(chtLink).toHaveAttribute('href', `/${SupportedLanguages.CHT}${GeneralPath.ABOUT}`);
    fireEvent.click(chtLink);
    expect(gaLangChange).toHaveBeenCalledWith(SupportedLanguages.EN, SupportedLanguages.CHT);
    expect(setCookies).toHaveBeenCalledWith(CookiesKeys.LANG, SupportedLanguages.CHT);
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

    const chtLink = screen.getByText(SupportedLanguageNames[SupportedLanguages.CHT]);
    expect(chtLink).toHaveAttribute(
      'href',
      makePostPath(PostPath.ANALYSIS, {pid: 7, lang: SupportedLanguages.CHT}),
    );
    fireEvent.click(chtLink);
    expect(gaLangChange).toHaveBeenCalledWith(SupportedLanguages.EN, SupportedLanguages.CHT);
    expect(setCookies).toHaveBeenCalledWith(CookiesKeys.LANG, SupportedLanguages.CHT);
  });
});

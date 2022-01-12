import React from 'react';

import {fireEvent, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../test/render/main';
import {SupportedLanguageNames, SupportedLanguages} from '../../../api-def/api';
import {makePostUrl, GeneralPath, PostPath} from '../../../api-def/paths';
import {CookiesKeys} from '../../../utils/cookies/keys';
import * as cookiesUtils from '../../../utils/cookies/utils';
import {GoogleAnalytics} from '../../../utils/services/ga';
import {NavLanguageSwitch} from './switch';


describe('Language Switch', () => {
  let gaLangChange: jest.SpyInstance;
  let setCookies: jest.SpyInstance;

  beforeEach(() => {
    gaLangChange = jest.spyOn(GoogleAnalytics, 'languageChange');
    setCookies = jest.spyOn(cookiesUtils, 'setCookies');
  });

  it('shows the current language', async () => {
    renderReact(() => <NavLanguageSwitch/>);

    expect(screen.getAllByText(SupportedLanguageNames[SupportedLanguages.EN]).length).toBeGreaterThan(0);
  });

  it('shows the current language 2', async () => {
    renderReact(
      () => <NavLanguageSwitch/>,
      {routerOptions: {locale: SupportedLanguages.CHT}},
    );

    expect(screen.getAllByText(SupportedLanguageNames[SupportedLanguages.CHT]).length).toBeGreaterThan(0);
  });

  it('shows the active language', async () => {
    renderReact(() => <NavLanguageSwitch/>);

    const enItems = screen.getAllByText(SupportedLanguageNames[SupportedLanguages.EN]);
    userEvent.click(enItems[0]);

    expect(enItems.length).toBe(3); // 1 already showing; 1 showing current active; 1 to be selected
    expect(screen.getByText(SupportedLanguageNames[SupportedLanguages.CHT])).toBeInTheDocument();
    expect(screen.getByText(SupportedLanguageNames[SupportedLanguages.JP])).toBeInTheDocument();
    expect(enItems[2]).toHaveAttribute('data-test-is-active', 'true');
  });

  it('redirects to the correct language page on click', async () => {
    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = {assign: jest.fn()};

    renderReact(
      () => <NavLanguageSwitch/>,
      {
        routerOptions: {
          pathname: GeneralPath.ABOUT,
        },
      },
    );

    const langSwitch = screen.getAllByText(SupportedLanguageNames[SupportedLanguages.EN])[0];
    userEvent.click(langSwitch);

    const destPath = `/${SupportedLanguages.CHT}${GeneralPath.ABOUT}`;

    const chtLink = screen.getByText(SupportedLanguageNames[SupportedLanguages.CHT]);
    expect(chtLink).toHaveAttribute('href', destPath);
    fireEvent.click(chtLink);
    expect(gaLangChange).toHaveBeenCalledWith(SupportedLanguages.EN, SupportedLanguages.CHT);
    expect(setCookies).toHaveBeenCalledWith(CookiesKeys.LANG, SupportedLanguages.CHT);
  });

  it('redirects to correct post page', async () => {
    renderReact(
      () => <NavLanguageSwitch/>,
      {
        routerOptions: {
          pathname: PostPath.ANALYSIS,
          query: {pid: '7'},
        },
      },
    );

    const langSwitch = screen.getAllByText(SupportedLanguageNames[SupportedLanguages.CHT])[0];
    userEvent.click(langSwitch);

    const destPath = makePostUrl(PostPath.ANALYSIS, {pid: 7, lang: SupportedLanguages.EN});

    const link = screen.getByText(SupportedLanguageNames[SupportedLanguages.EN]);
    expect(link).toHaveAttribute('href', destPath);
    userEvent.click(link);
    expect(gaLangChange).toHaveBeenCalledWith(SupportedLanguages.CHT, SupportedLanguages.EN);
    expect(setCookies).toHaveBeenCalledWith(CookiesKeys.LANG, SupportedLanguages.EN);
  });
});

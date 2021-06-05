import React from 'react';

import {act, fireEvent, screen, waitFor} from '@testing-library/react';

import {renderReact} from '../../test/render/main';
import {SupportedLanguageNames, SupportedLanguages} from '../api-def/api';
import {GeneralPath} from '../const/path/definitions';
import {GoogleAnalytics} from '../utils/services/ga';
import * as i18nHook from './hook';
import {LanguageSwitch} from './switch';

describe('Language Switch', () => {
  let gaLangChange: jest.SpyInstance;

  beforeEach(() => {
    gaLangChange = jest.spyOn(GoogleAnalytics, 'languageChange');
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
    act(() => {
      fireEvent.click(langSwitch);
    });

    const enItems = screen.getAllByText(SupportedLanguageNames[SupportedLanguages.EN]);
    expect(enItems.length).toBe(3);
    expect(screen.getByText(SupportedLanguageNames[SupportedLanguages.CHT])).toBeInTheDocument();
    expect(screen.getByText(SupportedLanguageNames[SupportedLanguages.JP])).toBeInTheDocument();

    await waitFor(() => {
      expect(enItems[2]).toHaveClass('active');
    });
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
    act(() => {
      fireEvent.click(langSwitch);
    });

    const chtLink = screen.getByText(SupportedLanguageNames[SupportedLanguages.CHT]);
    // `href` has locale IRL, but not in the test.
    // Clicking the link still change the language.
    act(() => {
      fireEvent.click(chtLink);
    });
    expect(gaLangChange).toHaveBeenCalledWith(SupportedLanguages.EN, SupportedLanguages.CHT);
  });
});
